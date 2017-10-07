SET NAMES utf8;

DROP DATABASE IF EXISTS jd;
CREATE DATABASE jd CHARSET=UTF8;
USE jd;


CREATE TABLE IF NOT EXISTS `jd_users` (
  `user_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `user_name` varchar(100),
  `user_pwd` varchar(100)
);

INSERT INTO `jd_users` VALUES(NULL, '强东', '123456');


CREATE TABLE IF NOT EXISTS `jd_products` (
  `product_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `product_name` varchar(100) ,
  `product_url` varchar(100) ,
  `product_img` varchar(100) 
) ;

INSERT INTO `jd_products` (`product_id`, `product_name`, `product_url`, `product_img`) VALUES
(1, '【限量秒杀】男士时尚韩版腰带加宽针扣潮商务皮带azkz A款针扣咖啡色', 'http://item.jd.com/1540292153.html', 'img/prod1.jpg'),
(2, 'BROWNE FOX通用皮带打孔器打孔针打孔冲子皮带冲子ZD-111 银色', 'http://item.jd.com/1604745360.html', 'img/prod2.jpg'),
(3, '阿迪达斯（adidas）男士健发强根去屑洗发露 220ml', 'http://item.jd.com/1070276.html', 'img/prod3.jpg'),
(4, '金士顿（Kingston） DT 101G2 8GB U盘 红色 经典之作', 'http://item.jd.com/1070276.html', 'img/prod4.jpg'),
(5, '苹果(Apple) iPhone 5s (A1518) 16GB 金色 移动4G手机', 'http://item.jd.com/1023433.html', 'img/prod5.jpg');


CREATE TABLE IF NOT EXISTS `jd_orders` (
  `order_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `order_num` varchar(10),
  `shop_name` varchar(40),
  `shop_url` varchar(100),
  `user_name` varchar(40),
  `price` decimal(16,2),
  `payment_mode` varchar(10),
  `submit_time` varchar(20),
  `order_state` int(1)
);

INSERT INTO `jd_orders` (`order_id`, `order_num`, `shop_name`, `shop_url`, `user_name`, `price`, `payment_mode`, `submit_time`, `order_state`) VALUES
(1, '9545709796', 'BROWNE FOX旗舰店', 'http://mall.jd.com/index-119003.html', '强东', '39.90', '在线支付', '2015-5-30T13:40:20', 2),
(2, '9195223439', '京东直营', '', '强东', '56.80', '货到付款', '2015-5-10T15:20:20', 3),
(3, '9545656843', '京东直营', '', '强东', '77.90', '在线支付', '2015-05-05T9:14:20', 1),
(4, '9130907509', '京东直营', '', '强东', '367.50', '在线支付', '2015-04-23T10:24:25', 3),
(5, '9130908111', 'BROWNE FOX旗舰店', '', '强东', '367.50', '在线支付', '2015-05-16T10:24:10', 4),
(6, '9130909101', '京东直营', '', '强东', '79.50', '货到付款', '2015-06-20T18:21:16', 3),
(7, '9130912322', '京东直营', '', '强东', '123.00', '在线支付', '2015-07-15T9:22:20', 2),
(8, '9130923433', 'BROWNE FOX旗舰店', '', '强东', '367.50', '在线支付', '2015-07-15T22:15:33', 3),
(9, '9130945443', '京东直营', '', '强东', '78.30', '货到付款', '2015-07-22T10:15:16', 2),
(10, '9130454323', '京东直营', '', '强东', '122.00', '货到付款', '2015-07-23T9:22:53', 3),
(11, '9130744544', '京东直营', '', '强东', '423.50', '在线支付', '2015-08-15T9:14:19', 1),
(12, '9130784452', 'BROWNE FOX旗舰店', '', '强东', '38.40', '货到付款', '2015-08-23T19:22:16', 3),
(13, '9140123442', 'BROWNE FOX旗舰店', '', '强东', '118.40', '货到付款', '2015-08-25T11:25:19', 2),
(14, '9141342100', '京东直营', '', '强东', '181.40', '货到付款', '2015-08-26T17:22:38', 3),
(15, '9142342347', 'BROWNE FOX旗舰店', '', '强东', '288.30', '货到付款', '2015-08-29T11:36:26', 4),
(16, '9234945344', '京东直营', '', '强东', '58.00', '在线支付', '2015-08-29T19:19:17', 4),
(17, '9234444554', '京东直营', '', '强东', '211.50', '在线支付', '2015-08-30T20:18:38', 3),
(18, '9298845345', '京东直营', '', '强东', '311.00', '货到付款', '2015-09-13T11:29:18', 3),
(19, '9312121922', 'BROWNE FOX旗舰店', '', '强东', '199.40', '货到付款', '2015-09-17T23:35:10', 3),
(20, '9398871134', '京东直营', '', '强东', '210.50', '在线支付', '2015-09-18T10:11:19', 4),
(21, '9499343157', '京东直营', '', '强东', '199.90', '在线支付', '2015-09-19T22:19:24', 2),
(22, '9598333413', 'BROWNE FOX旗舰店', '', '强东', '21.50', '货到付款', '2015-09-20T10:20:10', 3);


CREATE TABLE IF NOT EXISTS `jd_order_product_detail` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `order_id` int(11),
  `product_id` int(11)
);


INSERT INTO `jd_order_product_detail` (`id`, `order_id`, `product_id`) VALUES
(NULL, 1, 1),
(NULL, 1, 2),
(NULL, 2, 3),
(NULL, 3, 4),
(NULL, 4, 2),
(NULL, 4, 3),
(NULL, 4, 5),
(NULL, 5, 1),
(NULL, 6, 2),
(NULL, 6, 4),
(NULL, 7, 3),
(NULL, 8, 4),
(NULL, 8, 5),
(NULL, 9, 2),
(NULL, 10, 1),
(NULL, 11, 2),
(NULL, 11, 5),
(NULL, 12, 4),
(NULL, 13, 2),
(NULL, 14, 1),
(NULL, 14, 3),
(NULL, 15, 5),
(NULL, 16, 1),
(NULL, 17, 2),
(NULL, 17, 3),
(NULL, 18, 3),
(NULL, 19, 1),
(NULL, 20, 2),
(NULL, 21, 3),
(NULL, 22, 4),
(NULL, 22, 5);


/**用户的抽奖记录表**/
CREATE  TABLE  jd_lottery(
	id  INT  PRIMARY KEY  AUTO_INCREMENT,
	user_name VARCHAR(40),
	lottery_time  VARCHAR(20),
	level  VARCHAR(16)
);
INSERT INTO  jd_lottery VALUES
(1, '强东', '2015-10-08 10:22:55',  '三等奖') ,
(2, '强东', '2015-10-08 11:22:55',  '二等奖') ,
(3, '强东', '2015-10-08 12:22:55',  '特等奖') ;

/**计算用户剩余的抽奖次数涉及到的SQL语句**/
/**SELECT  SUM(price)  FROM   jd_orders   WHERE  user_name='强东';**/
/**SELECT  COUNT(id)  FROM   jd_lottery  WHERE  user_name='强东';**/






