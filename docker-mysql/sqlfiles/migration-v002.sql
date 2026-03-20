USE ynov_ci;
CREATE TABLE IF NOT EXISTS utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100)
);
INSERT INTO utilisateur (nom, email)
VALUES ("Claudia", "claudia@test.com"),
    ("Kira", "kira@test.com"),
    ("Clow", "clow@test.com");