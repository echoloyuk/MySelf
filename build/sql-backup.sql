-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2015 年 11 月 13 日 03:59
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 数据库: `myself`
-- 
CREATE DATABASE `myself` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `myself`;

-- --------------------------------------------------------

-- 
-- 表的结构 `myself_article`
-- 

CREATE TABLE `myself_article` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(255) collate utf8_unicode_ci NOT NULL,
  `content` mediumtext collate utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `create_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  `update_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `count` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `myself_article`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `myself_category`
-- 

CREATE TABLE `myself_category` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) collate utf8_unicode_ci NOT NULL,
  `info` varchar(2550) collate utf8_unicode_ci default NULL,
  `create_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  `update_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `myself_category`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `myself_img`
-- 

CREATE TABLE `myself_img` (
  `id` int(11) NOT NULL auto_increment,
  `url` varchar(255) collate utf8_unicode_ci NOT NULL,
  `refer_to_article_id` int(11) NOT NULL,
  `size` varchar(255) collate utf8_unicode_ci NOT NULL,
  `create_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `myself_img`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `myself_user`
-- 

CREATE TABLE `myself_user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(255) collate utf8_unicode_ci NOT NULL,
  `password` varchar(255) collate utf8_unicode_ci NOT NULL,
  `img_url` varchar(255) collate utf8_unicode_ci default NULL,
  `sex` varchar(255) collate utf8_unicode_ci NOT NULL,
  `info` varchar(2550) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

-- 
-- 导出表中的数据 `myself_user`
-- 

INSERT INTO `myself_user` VALUES (1, 'machi', 'echo890202', NULL, 'm', NULL);
