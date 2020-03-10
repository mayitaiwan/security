/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : 

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2020-03-10 10:50:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `description` varchar(20) NOT NULL DEFAULT '' COMMENT '描述',
  `name` varchar(20) NOT NULL COMMENT '名称',
  `pid` bigint(20) DEFAULT NULL COMMENT '父目录id',
  `url` varchar(50) DEFAULT '' COMMENT '页面跳转url',
  `patchString` varchar(50) DEFAULT '' COMMENT '权限匹配字符串',
  `menuFlag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否在菜单中显示，0不在菜单中显示，1在菜单中显示',
  `orderNumber` tinyint(4) NOT NULL DEFAULT '0' COMMENT '同级目录排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('2', 'baseRole url', 'main', null, '/main/**', '/main/**', '0', '12');
INSERT INTO `sys_permission` VALUES ('3', '系统管理', '系统管理', null, '', '', '1', '0');
INSERT INTO `sys_permission` VALUES ('4', '用户管理', '用户管理', '3', '/user/index', '/user/**', '1', '0');
INSERT INTO `sys_permission` VALUES ('5', '角色管理', '角色管理', '3', '/role/index', '/role/**', '1', '1');
INSERT INTO `sys_permission` VALUES ('6', '权限管理', '权限管理', '3', '/permission/index', '/permission/**', '1', '2');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '角色id',
  `roledesc` varchar(20) DEFAULT '' COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', 'admin', null);
INSERT INTO `sys_role` VALUES ('2', 'baseRole', ' ');

-- ----------------------------
-- Table structure for sys_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `permission_id` bigint(20) NOT NULL COMMENT '权限id',
  KEY `FKmnbc71b4040rgprkv4aeu0h5p` (`permission_id`),
  KEY `FK31whauev046d3rg8ecubxa664` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
INSERT INTO `sys_role_permission` VALUES ('2', '2');
INSERT INTO `sys_role_permission` VALUES ('1', '3');
INSERT INTO `sys_role_permission` VALUES ('1', '4');
INSERT INTO `sys_role_permission` VALUES ('1', '5');
INSERT INTO `sys_role_permission` VALUES ('1', '6');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `username` varchar(20) NOT NULL COMMENT '中文名称',
  `useraccount` varchar(20) NOT NULL COMMENT '用户账号',
  `userdesc` varchar(20) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', '202CB962AC59075B964B07152D234B70', 'admin', 'admin', null);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  KEY `FK1ef5794xnbirtsnudta6p32on` (`role_id`),
  KEY `FKsbjvgfdwwy5rfbiag1bwh9x2b` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('1', '1');
INSERT INTO `sys_user_role` VALUES ('1', '2');
