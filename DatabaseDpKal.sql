CREATE TABLE Mitarbeiter (
    MitarbeiterID INT AUTO_INCREMENT PRIMARY KEY,
    Vorname VARCHAR(50) NOT NULL,
    Nachname VARCHAR(50) NOT NULL,
    Geburtsdatum DATE,
    EMail VARCHAR(100),
    Telefonnummer VARCHAR(15),
    Adresse VARCHAR(255)
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Role ENUM('Admin', 'Manager', 'Employee') NOT NULL,
    LastLogin DATETIME,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a default admin user (password should be hashed in a real scenario)
INSERT INTO Users (Username, PasswordHash, Email, Role)
VALUES ('admin', 'hashed_password_here', 'admin@example.com', 'Admin');



CREATE TABLE Qualifikationen (
    QualifikationID INT AUTO_INCREMENT PRIMARY KEY,
    Bezeichnung VARCHAR(100) NOT NULL,
    Beschreibung TEXT
);

CREATE TABLE Mitarbeiter_Qualifikationen (
    MitarbeiterID INT,
    QualifikationID INT,
    ErworbenAm DATE,
    PRIMARY KEY (MitarbeiterID, QualifikationID),
    FOREIGN KEY (MitarbeiterID) REFERENCES Mitarbeiter(MitarbeiterID),
    FOREIGN KEY (QualifikationID) REFERENCES Qualifikationen(QualifikationID)
);

CREATE TABLE Schiffe (
    SchiffID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Kapazitaet INT
);

CREATE TABLE FahrtKategorien (
    FahrtKategorieID INT AUTO_INCREMENT PRIMARY KEY,
    Bezeichnung VARCHAR(100) NOT NULL,
    SchiffsfuehrerMin INT NOT NULL,
    BootsleuteMin INT NOT NULL,
    TeamleiterMin INT NOT NULL,
    ServicePersonalMin INT NOT NULL
);

CREATE TABLE Fahrten (
    FahrtID INT AUTO_INCREMENT PRIMARY KEY,
    SchiffID INT,
    Startdatum DATE NOT NULL,
    Enddatum DATE NOT NULL,
    Startort VARCHAR(100),
    Zielort VARCHAR(100),
    FahrtKategorieID INT,
    FOREIGN KEY (SchiffID) REFERENCES Schiffe(SchiffID),
    FOREIGN KEY (FahrtKategorieID) REFERENCES FahrtKategorien(FahrtKategorieID)
);

CREATE TABLE Mitarbeiter_Verfuegbarkeit (
    VerfuegbarkeitID INT AUTO_INCREMENT PRIMARY KEY,
    MitarbeiterID INT,
    Datum DATE,
    Startzeit TIME,
    Endzeit TIME,
    Verfuegbar BOOLEAN,
    FOREIGN KEY (MitarbeiterID) REFERENCES Mitarbeiter(MitarbeiterID)
);

CREATE TABLE Mitarbeiter_Generelle_Unverfuegbarkeit (
    UnverfuegbarkeitID INT AUTO_INCREMENT PRIMARY KEY,
    MitarbeiterID INT,
    Wochentag ENUM('Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'),
    Startzeit TIME,
    Endzeit TIME,
    FOREIGN KEY (MitarbeiterID) REFERENCES Mitarbeiter(MitarbeiterID)
);

CREATE TABLE Schiff_Bestand (
	SchiffID INT Primary KEY,
    ColaKasten INT,
    FantaKasten INT,
    SpriteKasten INT,
    SprudelKasten INT,
    NaturellKasten INT,
    OsaftKasten INT,
    AsaftKasten INT,
    BitterlemonKasten INT,
    TonicwaterKasten INT,
    FassbrauseKasten INT,
    BierFass INT,
    ErdingerKasten INT,
    ErdinkerAlkfreiKasten INT,
    BecksKasten INT,
    BecksAlkfreiKasten INT,
    WeisseKasten INT,
    PinotgrigioKiste INT,
    PinotgrigioSchlauch INT,
    
    FOREIGN KEY (SchiffID) REFERENCES Schiffe(SchiffID)
);

INSERT INTO Mitarbeiter (Vorname, Nachname, Geburtsdatum, EMail, Telefonnummer, Adresse)
VALUES
    ('Hendrik', 'Proessel-Juergensen', '1985-05-15', 'max.mustermann@example.com', '1234567890', 'Musterstraße 1, 12345 Musterstadt'),
    ('Nico', 'Steinwand', '1990-08-20', 'nico.steinwand@example.com', '0987654321', 'Beispielweg 2, 54321 Beispielstadt'),
    ('Fabrice', 'Boetcher', '1980-03-10', 'fabrice.boetcher@example.com', '1122334455', 'Hauptstraße 3, 98765 Haupstadt'),
    ('Dani', 'Wichert', '1980-03-10', 'fabrice.boetcher@example.com', '1122334455', 'Hauptstraße 3, 98765 Haupstadt');
	('Mika', 'Bsdurrek', '2006-08-14', 'mikanton@gmx.de', '017676685646', 'Haeselerstrasse 9, 14050 Berlin');
 
 
INSERT INTO Qualifikationen (Bezeichnung, Beschreibung)
VALUES
    (1,'Schiffsfuehrer', 'Erlaubnis, ein Schiff zu steuern'),
    (2,'Bootsmann', 'Verantwortlich für die Wartung und Betreuung der Boote'),
    (3,'Teamleiter', 'Koordination eines Teams'),
    (4,'Servicepersonal', 'Betreuung von Gästen während der Fahrt');

INSERT INTO Mitarbeiter_Qualifikationen (MitarbeiterID, QualifikationID, ErworbenAm)
VALUES
    (1, 1, '2010-06-15'),
    (2, 4, '2015-08-20'),
    (3, 2, '2012-04-10'),
    (3, 3, '2015-07-05');
    
INSERT INTO Schiffe (Name, Kapazitaet)
VALUES
    ('MS Heiterkeit', 145),
    ('MS Wappen von Spandau', 300),
    ('MS Havelblick', 199);
    
INSERT INTO FahrtKategorien (Bezeichnung, SchiffsfuehrerMin, BootsleuteMin, TeamleiterMin, ServicePersonalMin)
VALUES
    ('Linienfahrt', 1, 2, 1, 2),
    ('Tagestour', 1, 2, 1, 3),
    ('Charterfahrt', 1, 2, 1, 4);
    
INSERT INTO Fahrten (SchiffID, Startdatum, Enddatum, Startort, Zielort, FahrtKategorieID)
VALUES
    (1, '2024-01-15', '2024-01-20', 'Hamburg', 'Kiel', 1),
    (2, '2024-02-01', '2024-02-03', 'Rostock', 'Lübeck', 2),
    (3, '2024-03-10', '2024-03-12', 'Bremen', 'Helgoland', 3);
    
    
