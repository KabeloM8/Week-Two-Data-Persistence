use college;

CREATE TABLE student (
  id int NOT NULL AUTO_INCREMENT,
  firstname varchar(25),
  surname varchar(25),
  algebra int,
  calculus int,
  programming int,
  `databases` int,
  PRIMARY KEY (id)
);

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('1', 'Joe', 'Soap', '92', '78', '65', '67');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('2', 'Jane', 'Doe', '81', '79', '83', '89');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('3', 'Mary', 'Poppins', '63', '52', '65', '71');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('4', 'Mario', 'Rossi', '23', '42', '50', '44');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('5', 'John', 'Smith', '56', '67', '72', '72');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('6', 'Tom', 'Cruz', '81', '62', '53', '59');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('7', 'Jim', 'Beglin', '41', '48', '51', '53');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('8', 'Peter', 'Shmooks', '55', '55', '66', '58');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('9', 'Hans', 'Meier', '57', '87', '95', '64');

INSERT INTO college.student (id, firstname, surname, algebra, calculus, programming, `databases`)
VALUES ('10', 'Jackie, Brown', '97', '91', '86', '73');
