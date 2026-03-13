USE users;

CREATE TABLE IF NOT EXISTS utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    email VARCHAR(255)
);

INSERT INTO utilisateur (nom, email)
VALUES
('Alice', 'alice@test.com'),
('Claudia', 'claudia@test.com'),
('Bob', 'bob@test.com');