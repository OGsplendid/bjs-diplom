'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = logout => {
    ApiConnector.logout(response => {
        if (response) {
            location.reload();
        }
        console.log(response);
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function ratesRequest() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
};

ratesRequest();

setInterval(ratesRequest, 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = request => {
    ApiConnector.addMoney(request, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Баланс пополнен');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = request => {
    ApiConnector.convertMoney(request, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = request => {
    ApiConnector.transferMoney(request, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод выполнен');
        } else {
            moneyManager.setMessage(response.success, 'Не удалось произвести перевод');
        };
    });
};


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(request => {
    if (request.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(request.data);
        moneyManager.updateUsersList(request.data);
    }
});

favoritesWidget.addUserCallback = request => {
    ApiConnector.addUserToFavorites(request, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(request.data);
            moneyManager.updateUsersList(request.data);
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = request => {
    ApiConnector.removeUserFromFavorites(request, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(request.data);
            moneyManager.updateUsersList(request.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удалён из списка избранных');
        } else {
            favoritesWidget.setMessage(response.success, 'Не удалось удалить пользователя');
        }
    })
};
