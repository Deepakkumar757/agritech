CREATE TABLE `options` (
  `optionId` char(36) NOT NULL,
  `optionValue` varchar(255) NOT NULL,
  `questionId` char(36) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`optionId`)
);

CREATE TABLE `questions` (
  `questionId` char(36) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answerType` enum('dropdown','text') DEFAULT 'text',
  `linked` int DEFAULT '0',
  `isDefault` int DEFAULT '0',
  `leadFrom` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionId`)
);
