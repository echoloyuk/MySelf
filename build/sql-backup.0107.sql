-- phpMyAdmin SQL Dump
-- version 4.0.10.12
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016-01-07 15:35:34
-- 服务器版本: 5.0.51b-community-nt-log
-- PHP 版本: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `mc_myself`
--

-- --------------------------------------------------------

--
-- 表的结构 `myself_article`
--

CREATE TABLE IF NOT EXISTS `myself_article` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(255) collate utf8_unicode_ci NOT NULL,
  `content` mediumtext collate utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `create_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  `update_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `count` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=36 ;

--
-- 转存表中的数据 `myself_article`
--

INSERT INTO `myself_article` (`id`, `title`, `content`, `category_id`, `create_date`, `update_date`, `user_id`, `count`) VALUES
(35, 'asdasdas', 'asdhaklsdj\n\n![img](/static/uploads/myself145215084139264971.JPG)\n\nasdasdas\n\n![img](/static/uploads/myself145215089910458472.JPG)', 1, '2016-1-7 15:15:14', '2016-1-7 15:15:14', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `myself_category`
--

CREATE TABLE IF NOT EXISTS `myself_category` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) collate utf8_unicode_ci NOT NULL,
  `info` varchar(2550) collate utf8_unicode_ci default NULL,
  `create_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  `update_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `myself_img`
--

CREATE TABLE IF NOT EXISTS `myself_img` (
  `id` int(11) NOT NULL auto_increment,
  `url` varchar(255) collate utf8_unicode_ci NOT NULL,
  `refer_to_article_id` varchar(255) collate utf8_unicode_ci NOT NULL,
  `size` varchar(255) collate utf8_unicode_ci NOT NULL,
  `create_date` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- 表的结构 `myself_user`
--

CREATE TABLE IF NOT EXISTS `myself_user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(255) collate utf8_unicode_ci NOT NULL,
  `password` varchar(255) collate utf8_unicode_ci NOT NULL,
  `img_url` varchar(255) collate utf8_unicode_ci default NULL,
  `sex` varchar(255) collate utf8_unicode_ci NOT NULL,
  `info` varchar(2550) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `myself_user`
--

INSERT INTO `myself_user` (`id`, `username`, `password`, `img_url`, `sex`, `info`) VALUES
(1, 'machi', 'echo890202', NULL, 'm', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
