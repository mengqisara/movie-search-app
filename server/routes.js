const config = require('./config.json');
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect();

/////////////////////////////////////////////////////////////////////////////
//route related to part 1: movie search
// Movie Search -
// Keyword
// Name of movie
//http://127.0.0.1:8080/getmovie?field=moviename&fieldvalue=Kate
// Name of director
//http://127.0.0.1:8080/getmovie?field=director&fieldvalue=Stanley
// Name of writer
//http://127.0.0.1:8080/getmovie?field=writer&fieldvalue=Kubrick
// Name of actors/actresses
//http://127.0.0.1:8080/getmovie?field=actor&fieldvalue=Rowan
// Birth year
//http://127.0.0.1:8080/getmovie?field=birthyear&fieldvalue=1924
// Death year
//http://127.0.0.1:8080/getmovie?field=deathyear&fieldvalue=1924
// KnownForTitles
// Movie rating
//http://127.0.0.1:8080/getmovie?field=movierating&fieldvalue=3
// Movie year
//http://127.0.0.1:8080/getmovie?field=movieyear&fieldvalue=1990
// Movie runtime
//http://127.0.0.1:8080/getmovie?field=runtime&fieldvalue=190
// Movie genre
//http://127.0.0.1:8080/getmovie?field=genre&fieldvalue=Action
//Route 1(handler, get movie based on name)

async function getMovie(req, res) {
  const sfield = req.query.field ? req.query.field : '';
  const fieldvalue = req.query.fieldvalue ? req.query.fieldvalue : '';

  if (sfield == 'moviename') {
    connection.query(
      `      
         select movie.tconst, movie.title Name,null Director, movie.year Release_year, movie.runtime Runtime,null Writer, null Genre
        from movie
        where title like '%${fieldvalue} %' limit 100;`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'director') {
    connection.query(
      `
        select movie.tconst, movie.title Name,p.name Director, movie.year Release_year, movie.runtime Runtime,null Writer, null Genre
        from movie
            inner join directedBy on movie.tconst = directedBy.tconst
            inner join director on directedBy.nconst = director.nconst
            inner join person p on director.nconst=p.nconst
            where p.name like '%${fieldvalue}%' limit 100;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'writer') {
    connection.query(
      `
        select movie.tconst, movie.title Name,null Director, movie.year Release_year, movie.runtime Runtime,p.name Writer, null Genre
        from movie
        inner join writtenBy on movie.tconst = writtenBy.tconst
        inner join writer on writtenBy.nconst = writer.nconst
        inner join person p on writer.nconst=p.nconst
        where p.name like '%${fieldvalue}%' limit 100;;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'actor') {
    connection.query(
      `
        select * from
        (
          select movie.title Name,null Director, movie.year Release_year, movie.runtime Runtime,null Writer, null Genre
          from movie
        inner join actorBy b on movie.tconst = b.tconst
        inner join actor a on b.nconst = a.nconst
        inner join person p on b.nconst=p.nconst
        where p.name like '%${fieldvalue}%'
        union all
        select movie.title Name,null Director, movie.year Release_year, movie.runtime Runtime,null Writer, null Genre
        from movie
        inner join actressBy b on movie.tconst = b.tconst
        inner join actress a on b.nconst = a.nconst
        inner join person p on b.nconst=p.nconst
        where p.name like '%${fieldvalue}%'
        )x limit 100;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'birthyear') {
    connection.query(
      `
        
select m.tconst, m.title Name, m.year Release_year, m.runtime Runtime,x.name person from
(
select * from person where birthday = ${fieldvalue}
    ) x
inner join
    (
        select nconst, tconst from directedBy
        union
        select nconst, tconst from writtenBy
        union
        select nconst, tconst from actorBy
        union
        select nconst, tconst from actressBy
        ) y
on x.nconst = y.nconst
inner join movie m
on y.tconst=m.tconst
limit 100;

        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'deathyear') {
    connection.query(
      `
        
select m.tconst, m.title Name, m.year Release_year, m.runtime Runtime,x.name person from
(
select * from person where deathday = ${fieldvalue}
    ) x
inner join
    (
        select nconst, tconst from directedBy
        union
        select nconst, tconst from writtenBy
        union
        select nconst, tconst from actorBy
        union
        select nconst, tconst from actressBy
        ) y
on x.nconst = y.nconst
inner join movie m
on y.tconst=m.tconst
limit 100;

        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'movierating') {
    connection.query(
      `
        select m.tconst, m.title Name, m.year Release_year, m.runtime Runtime, r.avgRating from movie m
        inner join rating r
            on m.tconst=r.tconst
    where r.avgRating>${fieldvalue} and r.avgRating<${fieldvalue}+1
    limit 100;
    

        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'movieyear') {
    connection.query(
      `
        select movie.tconst, movie.title Name,null Director, movie.year Release_year, movie.runtime Runtime,null Writer, null Genre
        from movie
        where movie.year = ${fieldvalue}
        limit 100;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'runtime') {
    connection.query(
      `
        select movie.tconst, movie.title Name,null Director, movie.year Release_year, movie.runtime Runtime,null Writer, null Genre
        from movie
        where movie.runtime >= ${fieldvalue}
        limit 100;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'runtime') {
    connection.query(
      `
        select * from movie
        where movie.runtime >= ${fieldvalue}
        limit 100;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'genre') {
    connection.query(
      `
        select m.tconst, m.title Name,null Director, m.year Release_year, m.runtime Runtime,null Writer, g.name Genre
        from movie m
        inner join genreOf g
        on m.tconst = g.tconst
        where g.name like  '%${fieldvalue}%'
        limit 100;
        `,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

// Routes related to part 2 Actor Search -
// Keyword
// Name
//http://127.0.0.1:8080/getactor?field=name&fieldvalue=fred
// Birthday
//http://127.0.0.1:8080/getactor?field=birthyear&fieldvalue=1909
// Deathday (if any)
//http://127.0.0.1:8080/getactor?field=deathyear&fieldvalue=1909

async function getActor(req, res) {
  const sfield = req.query.field ? req.query.field : '';
  const fieldvalue = req.query.fieldvalue ? req.query.fieldvalue : '';

  if (sfield == 'name') {
    connection.query(
      `select * from (
            select p.*
            from actor a
                     inner join person p
                                on a.nconst = p.nconst
            union
            select p.*
            from actress a
                     inner join person p
                                on a.nconst = p.nconst
        ) x where x.name like '%${fieldvalue}%' limit 100;`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'birthyear') {
    connection.query(
      `select * from (
            select p.*
            from actor a
                     inner join person p
                                on a.nconst = p.nconst
            union
            select p.*
            from actress a
                     inner join person p
                                on a.nconst = p.nconst
        ) x where x.birthday = ${fieldvalue} limit 100;`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else if (sfield == 'deathyear') {
    connection.query(
      `select * from (
            select p.*
            from actor a
                     inner join person p
                                on a.nconst = p.nconst
            union
            select p.*
            from actress a
                     inner join person p
                                on a.nconst = p.nconst
        ) x where x.deathday = ${fieldvalue} limit 100;`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

// Ranking pages based on popularity of user reviews from MovieDB (complex search?)
// Based on rating & genre
//http://127.0.0.1:8080/getpopularmovie?rating=3&genre=Action

async function getPopularMovie(req, res) {
  const rating = req.query.rating ? req.query.rating : '';
  const genre = req.query.genre ? req.query.genre : '';

  connection.query(
    `select m.*,gO.name genre, r.avgRating from rating r
        inner join ${genre} gO on r.tconst = gO.tconst
        inner join movie m on r.tconst = m.tconst 
        where r.avgRating > ${rating} and r.avgRating<${rating}+1
        order by r.numVotes desc
        limit 100;`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

// Degree of connection between two actors/actresses or etc (complex search?)
//http://127.0.0.1:8080/getpopularmovie?rating=3&genre=Action

//If no movie is returned from the search, then select 5 random movies under the line “Sorry, there is no search result. Perhaps you would like to check out the following movies”
//http://127.0.0.1:8080/getrandommovie
async function getRandomMovie(req, res) {
  connection.query(
    `SELECT * FROM movie
        ORDER BY RAND()
        limit 10;`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

//Search for movies in which high rating director/writer and actor(s) participate: Search and list 5 (if less than 5, list all) movies of which the director or writer and at least one actor with average rating >=4.0 (out of 5.0) for all movies they participate/contribute in a given genre and director/writer and actor(s) co-participate/contribute to at least 2 movies (complex search)
//get quality movie
async function getQualityMovie(req, res) {
  const genre = req.query.genre ? req.query.genre : '';

  connection.query(
    `
    with highRankingMovie as (
        select m.*
        from movie m
                inner join ${genre} gO on m.tconst = gO.tconst
    ),

    highRankingActor as (
        select nconst,avg(avgRating) rate
        from (
                 select aB.nconst, aB.tconst, r2.avgRating
                 from actorBy aB
                          inner join rating r2 on aB.tconst = r2.tconst
                          inner join ${genre} g on aB.tconst = g.tconst
                 where r2.avgRating > 0
             ) x
        group by nconst
        having rate > 4
    ),
    highRankingActress as
             (
                 select nconst, avg(avgRating) rate
                 from (
                          select aB.nconst, aB.tconst, r2.avgRating
                          from actressBy aB
                                   inner join rating r2 on aB.tconst = r2.tconst
                                   inner join ${genre} g on aB.tconst = g.tconst
                          where r2.avgRating > 0
                      ) x
                 group by nconst
                 having rate > 4
             ),

    highRankingDirector as (
        select nconst, avg(avgRating) rate
        from (
                 select aB.nconst, aB.tconst, r2.avgRating
                 from directedBy aB
                          inner join rating r2 on aB.tconst = r2.tconst
                          inner join ${genre} g on aB.tconst = g.tconst
                 where r2.avgRating > 0
             ) x
        group by nconst
        having rate > 4
    ),
      highRankingWriter as
             (
                 select nconst,avg(avgRating) rate
                 from (
                          select aB.nconst, aB.tconst, r2.avgRating
                          from writtenBy aB
                                   inner join rating r2 on aB.tconst = r2.tconst
                                   inner join ${genre} g on aB.tconst = g.tconst
                          where r2.avgRating > 0
                      ) x
                 group by nconst
                 having rate > 4
             )

    select distinct hrm.*
    from highRankingMovie hrm
             inner join directedBy db on hrm.tconst = db.tconst
             inner join highRankingDirector hrd on db.nconst = hrd.nconst
             inner join actorBy ab on hrm.tconst = ab.tconst
             inner join highRankingActor hra on ab.nconst = hra.nconst
    union
    select distinct hrm.*
    from highRankingMovie hrm
             inner join writtenBy wB on hrm.tconst = wB.tconst
             inner join highRankingWriter hrw on wB.nconst = hrw.nconst
             inner join actorBy ab on hrm.tconst = ab.tconst
             inner join highRankingActor hra on ab.nconst = hra.nconst
    union
    select distinct hrm.*
    from highRankingMovie hrm
             inner join directedBy db on hrm.tconst = db.tconst
             inner join highRankingDirector hrd on db.nconst = hrd.nconst
             inner join actressBy ab on hrm.tconst = ab.tconst
             inner join highRankingActress hrat on ab.nconst = hrat.nconst
    union
    select distinct hrm.*
    from highRankingMovie hrm
             inner join writtenBy wB on hrm.tconst = wB.tconst
             inner join highRankingWriter hrw on wB.nconst = hrw.nconst
             inner join actressBy ab on hrm.tconst = ab.tconst
             inner join highRankingActress hrat on ab.nconst = hrat.nconst

    limit 100;`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

//Route 1(handler, get long run time movies)
//example: http://127.0.0.1:8080/longruntime?runtime=99
//http://127.0.0.1:8080/longruntime/longruntime
async function longruntime(req, res) {
  const runtime = req.query.runtime ? req.query.runtime : 100;

  connection.query(
    `SELECT title
        FROM movie
        WHERE movie.runtime >= ${runtime} limit 100;`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

//search name by pattern
//http://127.0.0.1:8080/findname?namepattern=alex%
//http://127.0.0.1:8080/findname
async function findname(req, res) {
  const namePattern = req.query.namepattern ? req.query.namepattern : '%';

  connection.query(
    `SELECT *
    FROM person where name like '${namePattern}' limit 100
    `,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

//search keyword
//http://127.0.0.1:8080/findKeyword?keywordPattern=titan
//http://127.0.0.1:8080/findKeyword
async function findKeyword(req, res) {
  const keywordPattern = req.query.keywordPattern
    ? req.query.keywordPattern
    : '';

  connection.query(
    `SELECT m.title AS Name, m.year AS Release_year, m.runtime AS Runtime, m.tconst 
FROM movie m
WHERE m.title like '%${keywordPattern}%' or m.tconst in (
    (SELECT aB.tconst
     FROM person p
              join actorBy aB on p.nconst = aB.nconst
     WHERE p.name like '%${keywordPattern}%')
    UNION
    (SELECT acB.tconst
     FROM person p
              join actressBy acB on p.nconst = acB.nconst
     WHERE p.name like '%${keywordPattern}%')
    UNION
    (SELECT dB.tconst
     FROM person p
              join directedBy dB on p.nconst = dB.nconst
     WHERE p.name like '%${keywordPattern}%')
    UNION
    (SELECT wB.tconst
     FROM person p
              join writtenBy wB on p.nconst = wB.nconst
     WHERE p.name like '%${keywordPattern}%')
)
ORDER BY m.title DESC
LIMIT 100;`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

//get information for rendering posts
//http://127.0.0.1:8080/getPost?field=movieId&fieldvalue=tt0035423

async function getPost(req, res) {
  const sfield = req.query.field ? req.query.field : '';
  const fieldvalue = req.query.fieldvalue ? req.query.fieldvalue : '';

  connection.query(
    `select m.tconst,m.title Name, m.year ReleaseYear,m.runtime Runtime,z.name Genre,x.name Director,y.name Writer,Round(s.avgRating,1) Rating
       from movie m
                left join (
           select distinct m.tconst,GROUP_CONCAT(p.name)name
           from person p
                    inner join directedBy db on p.nconst = db.nconst
                    inner join movie m on m.tconst = db.tconst
                    where m.tconst like '${fieldvalue}'
       ) x on x.tconst = m.tconst
                left join (
           select distinct m.tconst,GROUP_CONCAT(p.name)name
           from person p
                    inner join writtenBy rb on p.nconst = rb.nconst
                    inner join movie m on m.tconst = rb.tconst
                    where m.tconst like '${fieldvalue}'
       ) y on y.tconst = m.tconst
                left join (
           select m.tconst,GROUP_CONCAT(gO.name)name
           from genreOf gO
                    inner join movie m on gO.tconst = m.tconst
                    where m.tconst like '${fieldvalue}'
       ) z on z.tconst = m.tconst
                left join (
           select q.tconst, avg(q.avgRating) avgRating
           from (
                    select m.tconst, r.avgRating
                    from rating r
                             inner join movie m on r.tconst = m.tconst
                    where m.tconst like '${fieldvalue}'
                ) q
           group by q.tconst
       ) s on s.tconst=m.tconst
where m.tconst like '${fieldvalue}';`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

module.exports = {
  longruntime,
  findname,
  findKeyword,
  getMovie,
  getActor,
  getPopularMovie,
  getRandomMovie,
  getQualityMovie,
  getPost,
};
