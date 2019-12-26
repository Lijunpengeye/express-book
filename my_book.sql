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

 Date: 26/12/2019 18:05:17
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
  `logintime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '4d4994bde299f6168c65f24c852897b7', NULL);

-- ----------------------------
-- Table structure for newbook
-- ----------------------------
DROP TABLE IF EXISTS `newbook`;
CREATE TABLE `newbook`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `images` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `author` varchar(11) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `sortid` int(11) NOT NULL,
  `createtime` bigint(20) NULL DEFAULT NULL,
  `type` tinyint(10) NOT NULL,
  `descs` varchar(500) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `uptime` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of newbook
-- ----------------------------
INSERT INTO `newbook` VALUES (1, '我的书本42', '/1577176940404.png', '风花雪月42', 1, 1577086466728, 0, '简介一42', 1577242515248);
INSERT INTO `newbook` VALUES (6, '我的书本', '/1577171547747.png', '风花雪月', 1, 1577171572857, 0, '简介一简介一简介一简介一', 1577181652738);
INSERT INTO `newbook` VALUES (5, '新增书籍', '/1577170673805.png', '我的名字', 1, 1577171244459, 1, '新增简介简介简介简介简介简介新增简介简介简介简介简介简介', NULL);
INSERT INTO `newbook` VALUES (7, '新增二书', '/1577171547747.png', '我的名字2', 2, 1577171622483, 1, '简介一简介一简介一简介一', 1577181694091);
INSERT INTO `newbook` VALUES (8, '我的书本', '/1577177324700.png', '风花雪月', 1, 1577176122481, 0, '简介一', 1577177325959);
INSERT INTO `newbook` VALUES (9, 'mysqls', '/1577241950065.png', '测试', 2, 1577241954834, 0, 'mysqlsmysqlsmysqlsmysqls', NULL);

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sortname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `qq` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
