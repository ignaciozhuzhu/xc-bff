/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80028
Source Host           : localhost:3306
Source Database       : td

Target Server Type    : MYSQL
Target Server Version : 80028
File Encoding         : 65001

Date: 2022-01-25 21:07:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_branding
-- ----------------------------
DROP TABLE IF EXISTS `t_branding`;
CREATE TABLE `t_branding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandId` int DEFAULT NULL,
  `stickerImages` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `tapsImages` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_branding
-- ----------------------------
INSERT INTO `t_branding` VALUES ('1', '1', 'https://cdn.image.kfbuy.com/kfbuy1612170426490.jpg', 'https://cdn.image.kfbuy.com/kfbuy1612170297524.jpg');
INSERT INTO `t_branding` VALUES ('2', '1', 'https://cdn.image.kfbuy.com/kfbuy1612170443340.jpg', 'https://cdn.image.kfbuy.com/kfbuy1612170344956.jpg');

-- ----------------------------
-- Table structure for t_config
-- ----------------------------
DROP TABLE IF EXISTS `t_config`;
CREATE TABLE `t_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `appName` varchar(255) DEFAULT NULL,
  `scriptUrl` varchar(255) DEFAULT NULL,
  `GlobalSwitchIconNormal` varchar(255) DEFAULT NULL,
  `GlobalSwitchIconHover` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `devUrl` varchar(255) DEFAULT NULL,
  `publicPath` varchar(255) DEFAULT NULL,
  `primaryColor` varchar(255) DEFAULT NULL,
  `primaryHoverBackgroundColor` varchar(255) DEFAULT NULL,
  `navBackgroundColor` varchar(255) DEFAULT NULL,
  `navItemColor` varchar(255) DEFAULT NULL,
  `navItemOnColor` varchar(255) DEFAULT NULL,
  `navItemBackgroundColor` varchar(255) DEFAULT NULL,
  `navItemOnBackgroundColor` varchar(255) DEFAULT NULL,
  `productCardSelectedBorderColor` varchar(255) DEFAULT NULL,
  `sourcingListMessageBackgroundColor` varchar(255) DEFAULT NULL,
  `assetsDirectory` varchar(255) DEFAULT NULL,
  `loginModule` int DEFAULT NULL,
  `siderMenuModule` int DEFAULT NULL,
  `branding` int DEFAULT NULL,
  `icons` int DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `intercom` tinyint DEFAULT NULL,
  `HomePath` varchar(255) DEFAULT NULL,
  `chromeExtensionEnable` tinyint DEFAULT NULL,
  `AEPlatformEnable` tinyint DEFAULT NULL,
  `TopdserOfficialWebsiteEnable` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_config
-- ----------------------------
INSERT INTO `t_config` VALUES ('1', 'tp', 'Topdser2', 'undefined', '//at.alicdn.com/t/font_2212647_3svjr3kf7dc.js', 'iconAccount', 'iconAccount_hover', 'https://app.topdser.com/dsp-app', 'https://open.dev.kfbuy.com/dsp-app', 'https://cdn.topdser.com/', 'red', '#3e36e0', '#2B2A3F', '#9898BE', '#FFF', '#2b2a3f', '#4C4A73', '#82c853', '#544EC7', 'tp', null, null, null, null, '/tp_favicon.png', '1', '/topic', '1', '1', '1');
INSERT INTO `t_config` VALUES ('2', 'us', 'U-Send', 'us', '//at.alicdn.com/t/font_2212647_sa394u219el.js', 'iconb5', 'iconbb5', 'https://www.portal-usend.nl/dsp-app', 'https://open.dev.kfbuy.com/dsp-app', '/', '#9d00ff', '#BD53FF', 'linear-gradient(135deg, #9d00ff, #0b87ff)', '#E6BFFF', '#FFF', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.15)', '#9d00ff', 'linear-gradient(135deg, #9d00ff, #0b87ff)', 'us', null, null, null, null, '/us_favicon.png', '0', '/sourcing', '0', '0', '0');

-- ----------------------------
-- Table structure for t_icons
-- ----------------------------
DROP TABLE IF EXISTS `t_icons`;
CREATE TABLE `t_icons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `editB` varchar(255) DEFAULT NULL,
  `addB` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_icons
-- ----------------------------
INSERT INTO `t_icons` VALUES ('1', 'url(@/assets/platform/tp/Edit–b.png)', 'url(@/assets/platform/tp/Add-b.png');

-- ----------------------------
-- Table structure for t_loginmodule
-- ----------------------------
DROP TABLE IF EXISTS `t_loginmodule`;
CREATE TABLE `t_loginmodule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `w` varchar(255) DEFAULT NULL,
  `h` varchar(255) DEFAULT NULL,
  `backgroundImageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_loginmodule
-- ----------------------------
INSERT INTO `t_loginmodule` VALUES ('1', '193px', '40px', 'https://cdn.image.kfbuy.com/kfbuy1595387544024');

-- ----------------------------
-- Table structure for t_logostyles
-- ----------------------------
DROP TABLE IF EXISTS `t_logostyles`;
CREATE TABLE `t_logostyles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `width` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `marginTop` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_logostyles
-- ----------------------------
INSERT INTO `t_logostyles` VALUES ('1', '120px', '29px', '-4px');

-- ----------------------------
-- Table structure for t_sidermenumodule
-- ----------------------------
DROP TABLE IF EXISTS `t_sidermenumodule`;
CREATE TABLE `t_sidermenumodule` (
  `id` int NOT NULL,
  `logoStyles` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_sidermenumodule
-- ----------------------------
INSERT INTO `t_sidermenumodule` VALUES ('1', null);
