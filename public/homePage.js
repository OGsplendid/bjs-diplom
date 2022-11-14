'use strict';

import { request } from "express";

const logoutButton = new LogoutButton();

logoutButton.action = logout => {
    ApiConnector.logout(response => {
        if (response) {
            location.reload();
        }
    });
}

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

// ЗДЕСЬ НЕ ПОЛУЧИЛОСЬ ВЫВЕСТИ В КОНСОЛЬ RESPONSE, ПОЭТОМУ СДЕЛАЛ ПО АНАЛОГИИ С ПРЕДЫДУЩИМИ ПУНКТАМИ, 
// НО НИЧЕГО НЕ ВЫШЛО. ТАКЖЕ НЕ ПОНЯТНО, ЧТО ДОЛЖНО БЫТЬ АРГУМЕНТОМ isSuccess
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback(request => {
    ApiConnector.addMoney(request, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(isSuccess, response.error);
        }
    });
});

moneyManager.conversionMoneyCallback(request => {
    ApiConnector.convertMoney(request, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(isSuccess, response.error);
        }
    });
});



const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(request => {
    if (request.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(request.data);
        // НЕ НАШЁЛ МЕТОДА updateUsersList
    }
});

favoritesWidget.addUserCallback(request => {
    ApiConnector.addUserToFavorites(request, response => {
        console.log(response);
    })
})
