#将之前的用户角色权限的老的spring项目变成springboot项目


#用户角色权限5张表



/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : changeboot

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2020-09-10 10:20:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_function
-- ----------------------------
DROP TABLE IF EXISTS `sys_function`;
CREATE TABLE `sys_function` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `pid` int(10) DEFAULT NULL COMMENT '父id',
  `name` varchar(100) DEFAULT NULL COMMENT '名字',
  `code` varchar(32) DEFAULT NULL COMMENT '代码后面做shiro用到',
  `page` varchar(255) DEFAULT NULL COMMENT '链接地址',
  `zindex` int(3) DEFAULT NULL COMMENT '所在的顺序',
  `flag` tinyint(2) DEFAULT NULL COMMENT '是否删除 0代表删除了  1代表未被删除',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `operatetime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AK_Key_2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_function
-- ----------------------------
INSERT INTO `sys_function` VALUES ('1', '0', '系统设置', 'syscode', '#', '1', '1', '最顶端路径', null);
INSERT INTO `sys_function` VALUES ('2', '1', '用户管理', 'usercode', '/sysUserController/findUser.do', '2', '1', '第二层路径', null);
INSERT INTO `sys_function` VALUES ('3', '1', '角色管理', 'rolecode', '/sysRoleController/findRole.do', '3', '1', '第二层路径', null);
INSERT INTO `sys_function` VALUES ('4', '1', '菜单管理', 'functioncode', '/menu/findFunction.do', '4', '1', '第二层路径', null);
INSERT INTO `sys_function` VALUES ('5', '0', '平台用户管理', 'syscode', '#', '5', '1', '最顶端路径', '2017-03-14 08:58:51');
INSERT INTO `sys_function` VALUES ('6', '5', '企业用户', 'archivalInformationcode', '/archivalInformation/find.do', '6', '1', '第二层路径', '2017-03-14 08:58:29');
INSERT INTO `sys_function` VALUES ('7', '0', '企业信息审核', 'syscode', '#', '7', '1', '最顶端路径', '2017-03-14 08:59:08');
INSERT INTO `sys_function` VALUES ('8', '7', '企业用户', 'archivalInformationcode', '/archivalInformation/enterprise_audit.do', '8', '1', '第二层路径', '2017-03-14 08:59:04');
INSERT INTO `sys_function` VALUES ('14', '5', '代理商用户', 'archivalInformationcode', '/agentInfo/agentInfoList.do', '9', '1', '第二层路径', '2017-03-14 08:58:35');
INSERT INTO `sys_function` VALUES ('15', '7', 'hahahah', 'asdfaswf', 'asdf', '11', '1', null, '2016-08-12 16:42:20');
INSERT INTO `sys_function` VALUES ('16', '7', 'q5qw5', 'qewrqewr', 'wqer', '22', '1', null, '2016-08-12 16:42:15');
INSERT INTO `sys_function` VALUES ('17', '0', 'idrhftuirqeh', '563456', '542354', '2354', '1', null, '2016-08-12 16:55:43');
INSERT INTO `sys_function` VALUES ('18', '7', '253452345', '23542354', '2354', '2354', '1', null, '2016-08-12 16:56:45');
INSERT INTO `sys_function` VALUES ('19', '0', '维权管理', 'syscode', '#', '1', '1', '最顶端路径', '2017-03-14 08:59:18');
INSERT INTO `sys_function` VALUES ('20', '19', '企业异议审核', 'syscode', '/objectApplication/getAllApplication.do', '2', '1', '第二层路径', '2017-03-14 08:59:14');
INSERT INTO `sys_function` VALUES ('21', '0', '模型管理', 'syscode', '#', '1', '1', '最顶端路径', '2017-03-14 08:59:32');
INSERT INTO `sys_function` VALUES ('22', '21', '行业评分模型管理', 'syscode', '/modelManageController/modelList.do', '2', '1', '第二层路径', '2017-03-14 08:59:23');
INSERT INTO `sys_function` VALUES ('23', '21', '添加分类', 'syscode', '/classificationController/saveType.do', '2', '1', '第二层路径', '2017-03-14 08:59:27');
INSERT INTO `sys_function` VALUES ('24', '0', '企业征信机构管理', 'syscode', '#', '1', '1', '最顶端路径', '2017-03-14 08:59:44');
INSERT INTO `sys_function` VALUES ('25', '24', '企业征信机构统计', 'syscode', '/agentManage/main.do', '2', '1', '第二层路径', '2017-03-14 08:59:40');
INSERT INTO `sys_function` VALUES ('26', '0', '征信报告管理', 'syscode', '#', '1', '1', '最顶端路径', '2017-03-06 21:47:15');
INSERT INTO `sys_function` VALUES ('27', '26', '报告撰写', 'syscode', '/reportController/reportList.do', '2', '1', '第二层路径', '2017-03-06 21:47:07');
INSERT INTO `sys_function` VALUES ('28', '26', '报告审核', 'syscode', '#', '2', '1', '第二层路径', '2017-03-06 21:47:11');
INSERT INTO `sys_function` VALUES ('29', '1', 'demoTest', '555,232323', '/RoleController/findRoleByPage.do', '5', '1', null, '2020-06-08 14:43:27');
INSERT INTO `sys_function` VALUES ('30', '24', '彩带名称', '1234,234', 'www.baidu.com', '1', '1', null, '2017-03-13 11:32:13');
INSERT INTO `sys_function` VALUES ('31', '0', '设备管理', '#,', '#', null, '1', null, '2017-03-14 08:59:52');
INSERT INTO `sys_function` VALUES ('32', '31', '添加设备', ',', 'equipment/EquipmentController.do', null, '1', null, '2017-03-14 08:59:48');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(100) DEFAULT NULL COMMENT '角色名称',
  `code` varchar(32) NOT NULL COMMENT '角色代码',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `operatetime` varchar(100) DEFAULT NULL,
  `flag` tinyint(2) DEFAULT '1' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  KEY `AK_Key_2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', 'qqq', '', '', '2017-03-10 16:36:15', '1');
INSERT INTO `sys_role` VALUES ('2', '角色003', 'juese003', '角色备注003', '2016-08-12 15:26:59', '1');
INSERT INTO `sys_role` VALUES ('3', '特工1', 'tegong004', '备注', '2016-08-12 15:26:59', '1');
INSERT INTO `sys_role` VALUES ('4', '角色1', '代码1', '备注1', '2017-03-08 14:44:25', '1');
INSERT INTO `sys_role` VALUES ('5', 'r5', '', '', '2017-03-09 10:56:26', '0');
INSERT INTO `sys_role` VALUES ('6', 'r', '', '', '2017-03-09 10:56:36', '0');
INSERT INTO `sys_role` VALUES ('7', '角色名称111', '角色代码', '角色备注', '2017-03-13 10:36:57', '0');

-- ----------------------------
-- Table structure for sys_role_function
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_function`;
CREATE TABLE `sys_role_function` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '角色权限id',
  `function_id` int(10) NOT NULL COMMENT '表id',
  `role_id` int(10) NOT NULL COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_function
-- ----------------------------
INSERT INTO `sys_role_function` VALUES ('30', '0', '0');
INSERT INTO `sys_role_function` VALUES ('62', '1', '2');
INSERT INTO `sys_role_function` VALUES ('64', '1', '4');
INSERT INTO `sys_role_function` VALUES ('65', '1', '29');
INSERT INTO `sys_role_function` VALUES ('66', '1', '7');
INSERT INTO `sys_role_function` VALUES ('67', '1', '8');
INSERT INTO `sys_role_function` VALUES ('68', '1', '19');
INSERT INTO `sys_role_function` VALUES ('69', '1', '20');
INSERT INTO `sys_role_function` VALUES ('70', '1', '21');
INSERT INTO `sys_role_function` VALUES ('71', '1', '22');
INSERT INTO `sys_role_function` VALUES ('72', '1', '23');
INSERT INTO `sys_role_function` VALUES ('73', '1', '24');
INSERT INTO `sys_role_function` VALUES ('74', '1', '25');
INSERT INTO `sys_role_function` VALUES ('103', '3', '2');
INSERT INTO `sys_role_function` VALUES ('105', '3', '4');
INSERT INTO `sys_role_function` VALUES ('106', '3', '29');
INSERT INTO `sys_role_function` VALUES ('107', '3', '5');
INSERT INTO `sys_role_function` VALUES ('108', '3', '6');
INSERT INTO `sys_role_function` VALUES ('109', '3', '14');
INSERT INTO `sys_role_function` VALUES ('110', '3', '7');
INSERT INTO `sys_role_function` VALUES ('111', '3', '8');
INSERT INTO `sys_role_function` VALUES ('112', '3', '21');
INSERT INTO `sys_role_function` VALUES ('113', '3', '22');
INSERT INTO `sys_role_function` VALUES ('114', '3', '23');
INSERT INTO `sys_role_function` VALUES ('116', '2', '2');
INSERT INTO `sys_role_function` VALUES ('118', '2', '4');
INSERT INTO `sys_role_function` VALUES ('119', '2', '29');
INSERT INTO `sys_role_function` VALUES ('120', '2', '5');
INSERT INTO `sys_role_function` VALUES ('121', '2', '6');
INSERT INTO `sys_role_function` VALUES ('122', '2', '14');
INSERT INTO `sys_role_function` VALUES ('123', '4', '5');
INSERT INTO `sys_role_function` VALUES ('124', '4', '6');
INSERT INTO `sys_role_function` VALUES ('125', '4', '21');
INSERT INTO `sys_role_function` VALUES ('126', '4', '23');
INSERT INTO `sys_role_function` VALUES ('127', '1', '1');
INSERT INTO `sys_role_function` VALUES ('128', '2', '1');
INSERT INTO `sys_role_function` VALUES ('129', '3', '1');
INSERT INTO `sys_role_function` VALUES ('130', '4', '1');
INSERT INTO `sys_role_function` VALUES ('131', '29', '1');
INSERT INTO `sys_role_function` VALUES ('132', '1', '3');
INSERT INTO `sys_role_function` VALUES ('133', '2', '3');
INSERT INTO `sys_role_function` VALUES ('134', '3', '3');
INSERT INTO `sys_role_function` VALUES ('135', '4', '3');
INSERT INTO `sys_role_function` VALUES ('136', '29', '3');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `salary` decimal(10,2) DEFAULT NULL COMMENT '工资',
  `birthday` varchar(32) DEFAULT NULL COMMENT '生日',
  `gender` varchar(10) DEFAULT NULL COMMENT '性别',
  `station` varchar(40) DEFAULT NULL COMMENT '公司',
  `telephone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  `createtime` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `flag` tinyint(2) DEFAULT '1' COMMENT '是否被删除',
  `remark` varchar(255) DEFAULT NULL,
  `nickname` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', 'E10ADC3949BA59ABBE56E057F20F883E', '1000.00', '2016-04-27 13:45:22', '男', '222', '13269755555', '985912628@qq.com', '2016-04-21 20:03:35', '1', '没有', '昵称admin');
INSERT INTO `sys_user` VALUES ('40', 'abcdef', null, null, null, null, null, '13269755565', null, '2017-03-07 14:26:45', '0', 'beizhua', null);
INSERT INTO `sys_user` VALUES ('41', 'a', '0CC175B9C0F1B6A831C399E269772661', null, null, null, null, '123', null, '2017-03-09 09:00:25', '0', '1', null);
INSERT INTO `sys_user` VALUES ('42', '1', null, null, null, null, null, '1', null, '2017-03-08 15:23:14', '0', '1', null);
INSERT INTO `sys_user` VALUES ('43', 'a', '0CC175B9C0F1B6A831C399E269772661', null, null, null, null, '11', null, '2017-03-08 16:52:44', '0', '11', null);
INSERT INTO `sys_user` VALUES ('44', 'æ°å¢æµè¯', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '232323', null, '2017-03-08 17:00:43', '0', '3434', null);
INSERT INTO `sys_user` VALUES ('45', 'a', '0CC175B9C0F1B6A831C399E269772661', null, null, null, null, '111', null, '2017-03-08 17:23:41', '0', '111', null);
INSERT INTO `sys_user` VALUES ('46', 'admin222222', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '121212', null, '2017-03-09 09:06:55', '1', '12121', null);
INSERT INTO `sys_user` VALUES ('47', 'abv', '0CC175B9C0F1B6A831C399E269772661', null, null, null, null, '123', null, '2020-06-08 14:46:28', '1', '1', null);
INSERT INTO `sys_user` VALUES ('48', 'zhangsi', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '13269755555', null, '2017-03-09 09:30:13', '1', 'meiyou', null);
INSERT INTO `sys_user` VALUES ('49', 'aaa', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '132', null, '2017-03-13 10:31:51', '0', '张三', null);
INSERT INTO `sys_user` VALUES ('50', 'akgkg', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '1333', null, '2017-03-13 10:33:23', '0', 'å¤æ³¨ä¿¡æ¯', null);
INSERT INTO `sys_user` VALUES ('51', 'ggddss', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '111', null, '2020-06-08 14:45:23', '0', '备注心意', null);
INSERT INTO `sys_user` VALUES ('52', 'saad', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, 'aaa', null, '2017-03-13 11:09:40', '0', 'aaa', null);
INSERT INTO `sys_user` VALUES ('53', 'assda', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, 'ada', null, '2017-03-13 11:09:39', '0', 'adds', null);
INSERT INTO `sys_user` VALUES ('54', '', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '', null, '2017-03-13 11:13:10', '0', '', null);
INSERT INTO `sys_user` VALUES ('55', 'dfsdss', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '', null, '2017-03-13 11:16:54', '0', '', null);
INSERT INTO `sys_user` VALUES ('56', 'dssd', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '', null, '2017-03-13 11:18:04', '0', '', null);
INSERT INTO `sys_user` VALUES ('57', 'gdgdgd', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, 'ddddd', null, '2017-03-13 11:18:06', '0', 'dddddd', null);
INSERT INTO `sys_user` VALUES ('58', 'gjgjgjgjgjj', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '', null, '2017-03-13 11:22:59', '0', '', null);
INSERT INTO `sys_user` VALUES ('59', 'dfgdfgdggdg', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, '', null, '2017-03-13 11:22:57', '0', '', null);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户角色id',
  `role_id` int(10) NOT NULL COMMENT '角色id',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('1', '1', '1');
INSERT INTO `sys_user_role` VALUES ('11', '1', '27');
INSERT INTO `sys_user_role` VALUES ('13', '1', '28');
INSERT INTO `sys_user_role` VALUES ('14', '1', '10');
INSERT INTO `sys_user_role` VALUES ('26', '1', '40');
INSERT INTO `sys_user_role` VALUES ('28', '1', '42');
INSERT INTO `sys_user_role` VALUES ('29', '1', '43');
INSERT INTO `sys_user_role` VALUES ('30', '1', '44');
INSERT INTO `sys_user_role` VALUES ('31', '2', '45');
INSERT INTO `sys_user_role` VALUES ('43', '1', '41');
INSERT INTO `sys_user_role` VALUES ('44', '3', '41');
INSERT INTO `sys_user_role` VALUES ('48', '2', '46');
INSERT INTO `sys_user_role` VALUES ('60', '1', '53');
INSERT INTO `sys_user_role` VALUES ('61', '2', '54');
INSERT INTO `sys_user_role` VALUES ('62', '3', '54');
INSERT INTO `sys_user_role` VALUES ('63', '2', '55');
INSERT INTO `sys_user_role` VALUES ('64', '2', '56');
INSERT INTO `sys_user_role` VALUES ('65', '2', '57');
INSERT INTO `sys_user_role` VALUES ('66', '1', '58');
INSERT INTO `sys_user_role` VALUES ('67', '1', '59');
INSERT INTO `sys_user_role` VALUES ('68', '3', '47');
INSERT INTO `sys_user_role` VALUES ('69', '4', '47');

