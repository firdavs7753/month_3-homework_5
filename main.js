let timer = null;
        let holiday = "Мой день рождения";

        document.getElementById("holiday").textContent = holiday;

        function updateClock() {
            let now = new Date();

            document.getElementById("clock").textContent =
                now.toLocaleTimeString("ru-RU", {
                    hour12: false
                });
        }

        function updateWeekday(date) {
            let days = [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота"
            ];

            document.getElementById("weekday").textContent =
                "День недели: " + days[date.getDay()];
        }

        function startTimer() {
            if (timer !== null) {
                return;
            }

            let input = document.getElementById("dateInput");

            if (!input.value) {
                alert("Выберите дату!");
                return;
            }

            let targetDate = new Date(input.value);

            updateWeekday(targetDate);

            function updateCountdown() {
                let now = new Date();
                let difference = targetDate - now;

                let countdown = document.getElementById("countdown");

                if (difference <= 0) {
                    countdown.textContent = "Дата уже прошла";
                    countdown.style.color = "black";
                    stopTimer();
                    return;
                }

                let days = Math.floor(difference / (1000 * 60 * 60 * 24));
                let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                let minutes = Math.floor((difference / (1000 * 60)) % 60);
                let seconds = Math.floor((difference / 1000) % 60);

                countdown.textContent =
                    `Дней: ${days}, часов: ${hours}, минут: ${minutes}, секунд: ${seconds}`;

                if (difference < 24 * 60 * 60 * 1000) {
                    countdown.style.color = "red";
                } else {
                    countdown.style.color = "green";
                }
            }

            updateCountdown();

            if (targetDate > new Date()) {
                timer = setInterval(updateCountdown, 1000);
            }
        }

        function stopTimer() {
            clearInterval(timer);
            timer = null;
        }

        updateClock();
        setInterval(updateClock, 1000);