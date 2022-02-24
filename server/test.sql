-- CREATE TABLE user(usrId Integer PRIMARY KEY AUTOINCREMENT, account VARCHAR2(20) UNIQUE NOT NULL, password VARCHAR2(32) NOT NULL);
-- DROP TABLE user;
-- CREATE TABLE goods(goodId Integer PRIMARY KEY AUTOINCREMENT, name VARCHAR2(20) NOT NULL, price float DEFAULT 0.0, image VARCHAR2(32));
-- INSERT INTO goods(name,price,image) VALUES("Gigabyte GeForce RTX 3060 Ti EAGLE 8G", 3099, "GV-N306TEAGLE-8GD.png");
INSERT INTO goods(goodId, name,price,image) VALUES(2,"EVGA GeForce RTX 3060 XC Black GAMING", 2299, "12G-P5-3655-KR.png");
-- INSERT INTO goods(name,price,image) VALUES("Gigabyte GeForce RTX 3070 EAGLE 8G", 3399, "GV-N3070EAGLE-8GD.png");
-- INSERT INTO goods(name,price,image) VALUES("ASUS DUAL-RTX3070-8G", 4299, "DUAL-RTX3070-8G.png");
-- ALTER TABLE user ADD nickname VARCHAR2(20) NOT NULL DEFAULT "用户"
INSERT INTO goods(name,price,image) VALUES("Gigabyte AMD RX 6600 XT EAGLE 8G", 2299, "GV-R66XTEAGLE-8GD.png");
INSERT INTO goods(name,price,image) VALUES("AORUS AMD RX 6700 XT ELITE 12G", 3299, "GV-R67XTAORUS-E-12GD.png");
INSERT INTO goods(name,price,image) VALUES("Gigabyte AMD RX 6500 XT EAGLE 4G", 1599, "GV-R65XTEAGLE-4GD.png");
DELETE FROM user WHERE usrId < 6;