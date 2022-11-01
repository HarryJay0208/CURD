CREATE TABLE `curd`.`user` (`id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(50) NOT NULL , `last_name` VARCHAR(50) NOT NULL , `email` VARCHAR(50) NOT NULL , `phone` VARCHAR(50) NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(50) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO `user`
(`id`, `first_name`,  `last_name`,  `email`,           `phone`,    `comments`,  `status` )VALUES
(NULL, 'kirk',        'Hammet',     'kirkmetal@.com',   '76348564',  '' ,       'active'      ),
(NULL, 'Jhon',        'five',     'Jhonmetal@.com',   '34348564',  '' ,       'active'      ),
(NULL, 'james',        'hatfiled',     'jjkmetal@.com',   '99348564',  '' ,       'active'      ),
(NULL, 'kk',        'Hammet',     'kirkmetal@.com',   '12348564',  '' ,       'active'      ),
(NULL, 'depp',        'mmet',     'derkmetal@.com',   '76348564',  '' ,       'active'      ),
(NULL, 'kir',        'Hmmt',     'kmetal@.com',   '76348564',  '' ,       'active'      ),
(NULL, 'irko',        'soome',     'irkol@.com',   '76348564',  '' ,       'active'      )
