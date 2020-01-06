/*
 Navicat MySQL Data Transfer

 Source Server         : myblog
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : my_book

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 06/01/2020 13:37:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `logintime` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'ff57fddeb2732054faf38544f6049018', NULL);

-- ----------------------------
-- Table structure for author_uaers
-- ----------------------------
DROP TABLE IF EXISTS `author_uaers`;
CREATE TABLE `author_uaers`  (
  `author_id` int(11) NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `cellphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `grade_id` int(10) NULL DEFAULT NULL COMMENT '等级id',
  PRIMARY KEY (`author_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'banner id',
  `banner_img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'banner图片路径',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT 'banner名',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `is_display` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT 'Y显示，N不显示',
  `createtime` datetime(6) NULL DEFAULT NULL COMMENT '创建时间',
  `uptime` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (10, '/1577548350078.jpg', '2222222111', '2019-12-17 00:00:00', '2020-01-31 00:00:00', 'N', NULL, '2019-12-29 10:27:13');
INSERT INTO `banner` VALUES (11, '/1577548332498.png', '123232', '2019-12-05 00:00:00', '2020-01-08 00:00:00', 'N', NULL, '2019-12-28 23:52:15');
INSERT INTO `banner` VALUES (12, '/1577548585208.png', '666666666', '2019-12-23 00:00:00', '2020-02-01 00:00:00', 'N', NULL, '2019-12-28 23:58:16');
INSERT INTO `banner` VALUES (13, '/1577548680175.jpg', 'hahahh', '2019-12-26 00:00:00', '2020-01-31 00:00:00', 'Y', NULL, '2019-12-28 23:58:01');
INSERT INTO `banner` VALUES (14, '/1577586490624.jpg', '5555555', '2019-12-02 00:00:00', '2020-01-25 00:00:00', 'Y', NULL, NULL);

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '书id',
  `bookname` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL COMMENT '书名',
  `images` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL COMMENT '图片路径',
  `author` varchar(11) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL COMMENT '作者',
  `sortid` int(11) NOT NULL COMMENT '类型id 1、玄幻，2、言情、3历史、4都市、5文学、6动漫',
  `createtime` datetime(6) NULL DEFAULT NULL COMMENT '创建时间',
  `is_display` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL DEFAULT 'Y' COMMENT '是否上架 Y上架，N下架',
  `description` varchar(500) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '简介',
  `uptime` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `price` float(20, 1) NOT NULL DEFAULT 0.0 COMMENT '价格',
  `vip_price` float(10, 1) NULL DEFAULT 0.0 COMMENT 'vip价格',
  `is_free` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '是否免费 Y:免费 N:付费',
  `renqun_type` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '男-女 M:男 W女',
  `book_type_id` int(11) NULL DEFAULT NULL COMMENT '书本前端显示类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '我的书本42', '/1577506514378.png', '风花雪月42', 1, '2019-12-28 21:16:08.668767', 'Y', '简介一42', '2020-01-03 11:33:02.433714', 10.0, 10.0, 'N', 'M', 1);
INSERT INTO `book` VALUES (6, '我的书本', '/1577506652434.jpg', '风花雪月', 1, '2019-12-28 21:16:08.682229', 'Y', '简介一简介一简介一简介一11', '2020-01-03 11:33:03.138879', 20.5, 10.0, 'N', 'W', 2);
INSERT INTO `book` VALUES (5, '新增书籍', '/1577506541758.jpg', '我的名字', 1, '2019-12-28 21:16:08.683525', 'Y', '新增简介简介简介简介简介简介新增简介简介简介简介简介简介', '2020-01-03 11:33:03.861614', 0.0, 0.0, 'Y', 'M', 3);
INSERT INTO `book` VALUES (7, '新增二书', '/1577506556098.jpg', '我的名字2', 2, '2019-12-28 21:16:08.685303', 'Y', '简介一简介一简介一简介一', '2020-01-03 11:33:04.594407', 0.0, 0.0, 'Y', 'W', 4);
INSERT INTO `book` VALUES (8, '我的书本', '/1577506566851.jpg', '风花雪月', 1, '2019-12-28 21:16:08.687120', 'Y', '简介一', '2020-01-03 11:33:05.649188', 0.0, 0.0, 'Y', 'M', 1);
INSERT INTO `book` VALUES (9, 'mysqls', '/1577506576788.jpg', '测试', 2, '2019-12-28 21:16:08.688536', 'Y', 'mysqlsmysqlsmysqlsmysqls', '2020-01-03 11:33:06.463880', 0.0, 0.0, 'Y', 'W', 2);
INSERT INTO `book` VALUES (10, '新增2', '/1577507702896.jpg', '我d', 2, '2019-12-28 21:16:08.690195', 'Y', '上帝1111111', '2020-01-03 11:33:07.297349', 2.0, 10.0, 'N', 'M', 3);
INSERT INTO `book` VALUES (11, '历史', '/1577511472592.jpg', '历史', 4, '2019-12-28 21:16:08.692500', 'Y', '历史历史历史历史历史', '2020-01-03 11:33:08.275489', 11.0, 10.0, 'N', 'W', 4);
INSERT INTO `book` VALUES (12, '测试时间', '/1577538682851.jpg', '测试时间', 4, '2019-12-28 21:15:25.994000', 'Y', '测试时间测试时间测试时间', '2020-01-03 11:33:09.722913', 10.0, 10.0, 'N', 'M', 1);
INSERT INTO `book` VALUES (13, '66666', '/1577543735325.jpg', '666', 4, '2019-12-28 22:35:37.566000', 'Y', '232388888', '2020-01-03 11:33:10.570993', 23.0, 10.0, 'Y', 'W', 2);
INSERT INTO `book` VALUES (14, '12323', '/1577544870475.jpg', '23232', 5, '2019-12-28 22:46:39.353000', 'Y', '2323', '2020-01-03 11:33:11.466366', 23.0, 10.0, 'N', 'M', 3);
INSERT INTO `book` VALUES (15, 'CEFEEC', '/1577545663190.jpg', 'ECEEC', 2, '2019-12-28 23:07:34.437000', 'N', '323232', '2020-01-03 11:33:13.042966', 12.0, 10.0, 'N', 'W', 4);
INSERT INTO `book` VALUES (16, 'asdfa', '/1577545663190.jpg', 'asdf', 1, '2020-01-03 11:57:41.944000', 'Y', 'sadfadf', '2020-01-03 12:07:39.861911', 10.0, 5.0, 'N', NULL, 2);
INSERT INTO `book` VALUES (17, 'erewr', '/1577545663190.jpg', 'ewrw', 2, '2020-01-03 12:05:10.297000', 'Y', 'werwer', '2020-01-03 12:07:40.901424', 0.0, 0.0, 'Y', 'W', 3);
INSERT INTO `book` VALUES (18, '343', '', '432', 3, '2020-01-03 12:07:09.742000', 'Y', '23423', NULL, 0.0, 0.0, 'Y', 'M', 1);
INSERT INTO `book` VALUES (19, 'cccc', '/1578024491459.jpg', 'ccc', 5, '2020-01-03 12:08:13.193000', 'Y', 'cdcdc', '2020-01-03 12:10:47.615000', 23.0, 2.0, 'N', 'W', 3);

-- ----------------------------
-- Table structure for book_type
-- ----------------------------
DROP TABLE IF EXISTS `book_type`;
CREATE TABLE `book_type`  (
  `type_id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_type
-- ----------------------------
INSERT INTO `book_type` VALUES (1, '白金作品');
INSERT INTO `book_type` VALUES (2, '主编力荐');
INSERT INTO `book_type` VALUES (3, '新作抢读');
INSERT INTO `book_type` VALUES (4, '限时免费');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `order_id` int(20) NOT NULL COMMENT '订单id',
  `user_id` int(20) NOT NULL COMMENT '下单用户id',
  `order_number` int(20) NOT NULL COMMENT '订单编号',
  `buy_book_info` varbinary(500) NOT NULL COMMENT '购买书本ids',
  `order_money` float(255, 0) NOT NULL COMMENT '消费金额',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sortname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '1、玄幻，2、言情、3历史、4都市、5文学、6动漫',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sort
-- ----------------------------
INSERT INTO `sort` VALUES (1, '玄幻');
INSERT INTO `sort` VALUES (2, '言情');
INSERT INTO `sort` VALUES (3, '历史');
INSERT INTO `sort` VALUES (4, '都市');
INSERT INTO `sort` VALUES (5, '文学');
INSERT INTO `sort` VALUES (6, '动漫');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `info_id` int(11) NOT NULL,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '对应users表id',
  `collection_book_ids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收藏书本',
  `cart_book_ids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购物侧书本id',
  `buy_book_ids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `qq` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `head_portrait` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `account` float(20, 0) NULL DEFAULT NULL,
  `createtime` datetime(6) NULL DEFAULT NULL,
  `uptime` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `logintime` datetime(6) NULL DEFAULT NULL,
  `is_vip` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否是vip  Y是  N否',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (11, 'eye', 'ff57fddeb2732054faf38544f6049018', '408588023', 'kyle', NULL, 1000, '2019-12-29 10:29:42.000000', '2019-12-29 10:57:58.095495', NULL, 'N');

SET FOREIGN_KEY_CHECKS = 1;
