const credentialsData = {
  "Windows": [
    { system: "Windows (Admin)", login: "Administrator_ASU", password: "tec2@WSX3edc01", description: "Администрирование Windows" },
    { system: "SCADA WinCC RT (служба)", login: "ServerWinCCRT", password: "tec2@WSX2wxs", description: "Запуск WinCC RT как служба. Вход под этой учёткой запрещён!" },
    { system: "SCADA Operator", login: "Operator", password: "tec21qaz@WSX01", description: "Инженеры АСУ" },
    { system: "SCADA Engineer", login: "Engineer", password: "tec2&UJM7ujm", description: "Операторы КТС" },
    { system: "SCADA Operator (КТС)", login: "Operator", password: "tec21QAZ1qaz", description: "Операторы КТС" },

    { system: "АРМ Вибробита ТТ3", login: "Operator", password: "RakursVBARMTG3", location: "ТТ3" },
    { system: "АРМ Вибробита ТТ4", login: "Operator", password: "RakursVBARMTG4", location: "ТТ4" },
    { system: "АРМ Вибробита ТТ5", login: "Operator", password: "RakuSVBARTMG5", location: "ТТ5" },
    { system: "АРМ Вибробита ТТ6", login: "Operator", password: "RakuSVBARTMG6", location: "ТТ6" },

    { system: "АРМ Котла 5.1", login: "Operator", password: "Rakurs51", location: "Котёл 5.1" },
    { system: "АРМ Котла 5.2", login: "Operator", password: "Rakurs52", location: "Котёл 5.2" },
    { system: "АРМ Котла 6.2", login: "Operator", password: "Rakurs62", location: "Котёл 6.2" },
    { system: "АРМ Котла 7.1", login: "Operator", password: "Rakurs71", location: "Котёл 7.1" },
    { system: "АРМ Котла 7.2", login: "Operator", password: "Rakurs72", location: "Котёл 7.2" },

    { system: "АМАКС Котла 5.2", login: "Operator", password: "Rakurs52", location: "Котёл 5.2" },
    { system: "АМАКС Котла 6.2", login: "Operator", password: "Rakurs62", location: "Котёл 6.2" },
    { system: "АМАКС Котла 8.1", login: "Operator", password: "Rakurs81", location: "Котёл 8.1" },

    { system: "АРМ СУТЭ 3 блок", login: "Administrator", password: "RakuS3etap", location: "СУТЭ 3 блок" },
    { system: "АРМ 3 этап пожаротушения", login: "ADMINISTRATOR", password: "RakuS3etap", location: "3 этап" },

    { system: "Сервер Вибробрит ТТ3", login: "Администратор", password: "RakursVSBSERVTG3", location: "ТТ3" },
    { system: "Сервер Вибробрит ТТ4", login: "Admin", password: "RakursVSBSERVTG4", location: "ТТ4" },
    { system: "Сервер Вибробрит ТТ5", login: "Администратор", password: "RakursVSBSERVTG5", location: "ТТ5" },
    { system: "Сервер Вибробрит ТТ6", login: "Администратор", password: "RakursVSBSERVTG6", location: "ТТ6" },
    { system: "СУТЭ сервер основной", login: "administrator", password: "qwe890-", location: "СУТЭ" },
    { system: "СУТЭ сервер истории", login: "administrator", password: "qwe890-", location: "СУТЭ (возможно не актуален)" },
    { system: "КамКТС сервер основной", login: "Administrator", password: "RakursCCC", location: "КамКТС" },
    { system: "КамКТС сервер истории", login: "Administrator", password: "RakursCCC", location: "КамКТС" },

    { system: "SingleStation1 (ХВО)", login: "AdminASU", password: "Tec2@UM7um", description: "Администрирование" },
    { system: "SingleStation1 (ХВО)", login: "ServisWINCCRT", password: "Tec2@WSX2wsx", description: "Служба WinCC RT" },
    { system: "SingleStation1 (ХВО)", login: "Администратор", password: "QAZwsx12", description: "Администратор" },
    { system: "SingleStation1 (ХВО)", login: "Operator HVO", password: "Tec2QWE@as01", description: "Оператор ХВО" },
    { system: "SingleStation2 (ХВО)", login: "AdminASU", password: "Tec2@UM7um", description: "Администрирование" },
    { system: "SingleStation2 (ХВО)", login: "ServisWINCCRT", password: "Tec2@WSX2wsx", description: "Служба WinCC RT" },
    { system: "SingleStation2 (ХВО)", login: "Администратор", password: "QAZwsx12", description: "Администратор" },
    { system: "SingleStation2 (ХВО)", login: "Operator HVO", password: "Tec2QWE@as01", description: "Оператор ХВО" },
    { system: "Блок АРМ (типовое, ХВО)", login: "AdminSUS", password: "Tec2@UM7um", description: "Администрирование" },
    { system: "Блок АРМ (типовое, ХВО)", login: "ServisWINCCRT", password: "Tec2@WSX2wsx", description: "Служба WinCC RT" },
    { system: "Блок АРМ (типовое, ХВО)", login: "Администратор", password: "QAZwsx12", description: "Администратор" },
    { system: "Блок АРМ (типовое, ХВО)", login: "Operator HVO", password: "Tec2QWE@as01", description: "Оператор ХВО" }
  ],

  "SCADA/HMI": [
    { system: "Котёл 9 (операторская станция)", login: "Admin", password: "26102016", location: "К9" },
    { system: "Котёл 10 (операторская станция)", login: "Admin", password: "26102026", location: "К10" },
    { system: "ФНС, БНС, HMI панели", login: "Administrator", password: "123", description: "Панели оператора" },
    { system: "ФНС, БНС, HMI панели", login: "User_1", password: "123", description: "Панели оператора" },
    { system: "АРМ Вибробита ТГ4", login: "admin", password: "1", location: "ТГ4" }
  ],

  "ПЛК": [
    { system: "Siemens S7-400 (ЭБ5 К9)", password: "tec21QAZ1qaz", location: "БЩУ3, ЭБ5, К9" },
    { system: "Siemens S7-400 (АПТ)", password: "tec21QAZ1qaz", location: "БЩУ3, Система АПТ" },
    { system: "Siemens S7-400 (ЭБ6 К10)", password: "tec21QAZ1qaz", location: "БЩУ3, ЭБ6, К10" }
  ],

  "Коммутаторы": [
    { system: "Moxa A4", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.19.210", location: "БЩУ1, ЭБ1" },
    { system: "Moxa A5", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.19.211", location: "БЩУ1, ЭБ1" },
    { system: "Moxa A6", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.19.212", location: "БЩУ1, ЭБ1" },
    { system: "Moxa A7", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.19.213", location: "БЩУ1, ЭБ1" },
    { system: "Moxa SW1", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.20.201", location: "БЩУ1, ЭБ1" },
    { system: "Moxa SW2", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.20.202", location: "БЩУ1, ЭБ1" },
    { system: "Moxa SW3", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.20.203", location: "БЩУ1, ЭБ1" },
    { system: "Moxa SW4", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.20.204", location: "БЩУ1, ЭБ1" },
    { system: "Moxa SW5", login: "admin", password: "tec21QAZ2wxs", ip: "10.12.20.205", location: "БЩУ1, ЭБ1" },
    { system: "Siemens Scalance X208 (K9)", login: "admin", password: "K9x208Scalance", ip: "192.168.0.5", location: "БЩУ3, ЭБ5, K9" },
    { system: "Siemens Scalance X209 (K10)", login: "admin", password: "K10x208Scalance", ip: "192.168.1.50", location: "БЩУ3, ЭБ5, K9" },
    { system: "Mikrotik", login: "Engineer", password: "VBMikrotikTG6", ip: "192.168.1.80", location: "БЩУ3, ЭБ5, Шкаф Вибробрит" }
  ]
};