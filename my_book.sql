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

 Date: 10/01/2020 17:57:37
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
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'ff57fddeb2732054faf38544f6049018', NULL, '超级管理员');

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
INSERT INTO `banner` VALUES (10, '/banner_5.jpg', '2222222111', '2019-12-17 00:00:00', '2020-01-31 00:00:00', 'N', NULL, '2020-01-08 14:47:47');
INSERT INTO `banner` VALUES (11, '/banner_2.jpg', '123232', '2019-12-05 00:00:00', '2020-01-08 00:00:00', 'N', NULL, '2020-01-08 14:40:29');
INSERT INTO `banner` VALUES (12, '/banner_3.jpg', '666666666', '2019-12-23 00:00:00', '2020-02-01 00:00:00', 'N', NULL, '2020-01-08 14:40:33');
INSERT INTO `banner` VALUES (13, '/banner_4.jpg', 'hahahh', '2019-12-26 00:00:00', '2020-01-31 00:00:00', 'Y', NULL, '2020-01-08 14:40:38');
INSERT INTO `banner` VALUES (14, '/banner_5.jpg', '5555555', '2019-12-02 00:00:00', '2020-01-25 00:00:00', 'Y', NULL, '2020-01-08 14:40:49');

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
  `collection` int(255) NULL DEFAULT NULL COMMENT '收藏人数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 122 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '我的书本42', '/1577506514378.png', '风花雪月42', 1, '2019-12-28 21:16:08.668767', 'Y', '简介一42', '2020-01-03 11:33:02.433714', 10.0, 10.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (6, '我的书本', '/1577506514378.png', '风花雪月', 1, '2019-12-28 21:16:08.682229', 'Y', '简介一简介一简介一简介一11', '2020-01-08 14:39:54.343089', 20.5, 10.0, 'N', 'W', 2, NULL);
INSERT INTO `book` VALUES (5, '新增书籍', '/1577506514378.png', '我的名字', 1, '2019-12-28 21:16:08.683525', 'Y', '新增简介简介简介简介简介简介新增简介简介简介简介简介简介', '2020-01-08 14:39:55.192521', 0.0, 0.0, 'Y', 'M', 3, NULL);
INSERT INTO `book` VALUES (7, '新增二书', '/1577506514378.png', '我的名字2', 2, '2019-12-28 21:16:08.685303', 'Y', '简介一简介一简介一简介一', '2020-01-08 14:39:56.065651', 0.0, 0.0, 'Y', 'W', 4, NULL);
INSERT INTO `book` VALUES (8, '我的书本', '/1577506514378.png', '风花雪月', 1, '2019-12-28 21:16:08.687120', 'Y', '简介一', '2020-01-08 14:39:56.949406', 0.0, 0.0, 'Y', 'M', 1, NULL);
INSERT INTO `book` VALUES (9, 'mysqls', '/1577506514378.png', '测试', 2, '2019-12-28 21:16:08.688536', 'Y', 'mysqlsmysqlsmysqlsmysqls', '2020-01-08 14:39:57.764315', 0.0, 0.0, 'Y', 'W', 2, NULL);
INSERT INTO `book` VALUES (10, '新增2', '/1577506514378.png', '我d', 2, '2019-12-28 21:16:08.690195', 'Y', '上帝1111111', '2020-01-08 14:39:58.610239', 2.0, 10.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (11, '历史', '/1577506514378.png', '历史', 4, '2019-12-28 21:16:08.692500', 'Y', '历史历史历史历史历史', '2020-01-08 14:39:59.468103', 11.0, 10.0, 'N', 'W', 4, NULL);
INSERT INTO `book` VALUES (12, '测试时间', '/1577506514378.png', '测试时间', 4, '2019-12-28 21:15:25.994000', 'Y', '测试时间测试时间测试时间', '2020-01-08 14:40:00.344501', 12.0, 10.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (13, '66666', '/1577506514378.png', '666', 4, '2019-12-28 22:35:37.566000', 'Y', '232388888', '2020-01-08 14:40:01.227949', 23.0, 10.0, 'Y', 'W', 2, NULL);
INSERT INTO `book` VALUES (14, '12323', '/1577506514378.png', '23232', 5, '2019-12-28 22:46:39.353000', 'Y', '2323', '2020-01-08 14:40:02.149955', 23.0, 10.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (15, 'CEFEEC', '/1577506514378.png', 'ECEEC', 2, '2019-12-28 23:07:34.437000', 'N', '323232', '2020-01-08 14:40:02.961633', 12.0, 10.0, 'N', 'W', 4, NULL);
INSERT INTO `book` VALUES (16, 'asdfa', '/1577506514378.png', 'asdf', 1, '2020-01-03 11:57:41.944000', 'Y', 'sadfadf', '2020-01-08 14:40:03.818852', 10.0, 5.0, 'N', 'W', 2, NULL);
INSERT INTO `book` VALUES (17, 'erewr', '/1577506514378.png', 'ewrw', 2, '2020-01-03 12:05:10.297000', 'Y', 'werwer', '2020-01-08 14:40:04.734968', 0.0, 0.0, 'Y', 'W', 3, NULL);
INSERT INTO `book` VALUES (18, '343', '/1577506514378.png', '432', 3, '2020-01-03 12:07:09.742000', 'Y', '23423', '2020-01-08 14:40:05.716435', 0.0, 0.0, 'Y', 'M', 1, NULL);
INSERT INTO `book` VALUES (19, 'cccc', '/1577506514378.png', 'ccc', 5, '2020-01-03 12:08:13.193000', 'Y', 'cdcdc', '2020-01-08 14:40:06.973947', 23.0, 2.0, 'N', 'W', 3, NULL);
INSERT INTO `book` VALUES (23, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (24, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (25, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (26, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (27, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (28, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (29, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (30, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (31, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (32, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (33, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (34, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (35, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (36, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (37, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (38, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (39, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (40, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (41, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (42, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 1, NULL);
INSERT INTO `book` VALUES (43, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (44, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', '2020-01-10 17:16:29.252529', 5.0, 0.0, 'N', 'M', 2, 7);
INSERT INTO `book` VALUES (45, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (46, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (47, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (48, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (49, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (50, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (51, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (52, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (53, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (54, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (55, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (56, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (57, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (58, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (59, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (60, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (61, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (62, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (63, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (64, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (65, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (66, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 2, NULL);
INSERT INTO `book` VALUES (67, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (68, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (69, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (70, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (71, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (72, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (73, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (74, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (75, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (76, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (77, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (78, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (79, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (80, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (81, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (82, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (83, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (84, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (85, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (86, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (87, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (88, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (89, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (90, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (91, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (92, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 3, NULL);
INSERT INTO `book` VALUES (93, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (94, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (95, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (96, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (97, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (98, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (99, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (100, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (101, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (102, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (103, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (104, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (105, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (106, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (107, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (108, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (109, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (110, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (111, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (112, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (113, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (114, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (115, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (116, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (117, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (118, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (119, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (120, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);
INSERT INTO `book` VALUES (121, '天龙八部', '/1577506514378.png', '金庸', 1, NULL, 'Y', '天龙八部是金庸大神所写，是一本传奇的武侠小说', NULL, 5.0, 0.0, 'N', 'M', 4, NULL);

-- ----------------------------
-- Table structure for book_comment
-- ----------------------------
DROP TABLE IF EXISTS `book_comment`;
CREATE TABLE `book_comment`  (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `book_id` int(11) NOT NULL COMMENT '书本id',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名称',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `head_portrait` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `like_number` int(5) NOT NULL DEFAULT 0 COMMENT '点赞',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_comment
-- ----------------------------
INSERT INTO `book_comment` VALUES (1, 11, 1, 'eye', '好看！', '2020-01-06 16:18:33', '/avatar_21.jpg', 10);
INSERT INTO `book_comment` VALUES (2, 11, 44, 'eye', '我的评论-我的评论', '2020-01-10 14:17:15', '/avatar_21.jpg', 11);
INSERT INTO `book_comment` VALUES (3, 11, 44, 'eye', '我的评论-我的评论', '2020-01-10 14:17:20', '/avatar_21.jpg', 11);
INSERT INTO `book_comment` VALUES (4, 11, 44, 'eye', '我的评论-我的评论', '2020-01-10 14:17:23', '/avatar_21.jpg', 11);
INSERT INTO `book_comment` VALUES (5, 11, 44, 'eye', '我的评论-我的评论', '2020-01-10 14:17:26', '/avatar_21.jpg', 11);
INSERT INTO `book_comment` VALUES (6, 11, 44, 'eye', '我的评论-我的评论', '2020-01-10 14:17:29', '/avatar_21.jpg', 11);

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
-- Table structure for buy_order
-- ----------------------------
DROP TABLE IF EXISTS `buy_order`;
CREATE TABLE `buy_order`  (
  `order_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` int(20) NOT NULL COMMENT '下单用户id',
  `order_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单编号',
  `order_money` float(255, 0) NOT NULL COMMENT '消费金额',
  `buy_book_id` int(20) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 45 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
  `info_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '对应users表id',
  `collection_book_ids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收藏书本',
  `cart_book_ids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购物侧书本id',
  `buy_book_ids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `like_book_comment` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, 11, '10,11,12,13,14,15,16,17,44', '', '', '3,2,4,5,6');

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
INSERT INTO `users` VALUES (11, 'eye', 'ff57fddeb2732054faf38544f6049018', '408588023', 'kyle', '/avatar_21.jpg', 4, '2019-12-29 10:29:42.000000', '2020-01-10 17:33:14.177680', '2020-01-10 17:33:14.173000', 'N');

SET FOREIGN_KEY_CHECKS = 1;
