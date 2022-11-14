'use strict';

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

    ApiConnector.getStocks(response => {
        console.log(response);
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    };

setInterval(ratesRequest, 60000);
