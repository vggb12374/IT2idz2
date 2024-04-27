const ajax = new XMLHttpRequest();

document.getElementById("table1").style.opacity = "0";
document.getElementById("table2").style.opacity = "0";
document.getElementById("table3").style.opacity = "0";

function get1() {
    const Date_start = document.getElementById("Date_start").value;

    ajax.open("GET", "/get1?Date_start=" + Date_start);
    ajax.onreadystatechange = getData1;
    ajax.send();
}

function getData1() {
    if (ajax.readyState === 4 && ajax.status === 200) {
        document.getElementById("table1").style.opacity = "1";
        document.getElementById("thead1").innerText = "Дохід";

        if (ajax.response === "null") {
            document.getElementById("tbody1").innerText = "0";
        } else {
            document.getElementById("tbody1").innerText = ajax.response;
        }
    }
}

function get2select() {
    ajax.open("GET", "/get2select");
    ajax.onreadystatechange = getData2Select;
    ajax.send();
}

function getData2Select() {
    if (ajax.readyState === 4 && ajax.status === 200) {
        const select = document.getElementById("vendorsName");
        const res = JSON.parse(ajax.response);

        for (let i = 0; i < res.length; i++) {
            const option = document.createElement("option");
            option.text = res[i].Name;
            select.appendChild(option);
        }
    }
}

function get2() {
    const vendorsName = document.getElementById("vendorsName").value;

    ajax.open("GET", "/get2?vendorsName=" + vendorsName);
    ajax.onreadystatechange = getData2;
    ajax.send();
}

function getData2() {
    if (ajax.readyState === 4 && ajax.status === 200) {
        const res = JSON.parse(ajax.response);

        let tbody2 = "";

        for (let i = 0; i < res.length; i++) {
            tbody2 += "<tr>";
            tbody2 += "<td>" + res[i].Name + "</td>";
            tbody2 += "</tr>";
        }

        document.getElementById("table2").style.opacity = "1";
        document.getElementById("thead2").innerText = "Автомобіль";
        document.getElementById("tbody2").innerHTML = tbody2;
    }
}

function get3() {
    const date = document.getElementById("date").value;

    ajax.open("GET", "get3?date=" + date);
    ajax.onreadystatechange = getData3;
    ajax.send();
}

function getData3() {
    if (ajax.readyState === 4 && ajax.status === 200) {
        const res = JSON.parse(ajax.response);

        let tbody3 = "";

        for (let i = 0; i < res.length; i++) {
            tbody3 += "<tr>";
            tbody3 += "<td>" + res[i].Name + "</td><td>" + res[i].Release_date + "</td><td>" + res[i].Race + "</td><td>" + res[i].State + "</td><td>" + res[i].Price + "</td>";
            tbody3 += "</tr>";
        }
        
        document.getElementById("table3").style.opacity = "1";
        document.getElementById("thead3").innerHTML = "<tr><th>Назва</th><th>Рік випуску</th><th>Пробіг</th><th>Стан</th><th>Ціна</th></tr>";
        document.getElementById("tbody3").innerHTML = tbody3;
    }
}