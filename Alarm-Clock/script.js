document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const clearAlarmButton = document.getElementById('clear-alarm');
    const stopAlarmButton = document.getElementById('stop-alarm');
    const alarmAudio = document.getElementById('alarm-audio');
    let alarmTime = null;
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
        if (alarmTime && `${hours}:${minutes}` === alarmTime) {
            alarmAudio.play();
            stopAlarmButton.disabled = false;
        }
    }
    function setAlarm() {
        if (alarmTimeInput.value) {
            alarmTime = alarmTimeInput.value;
            setAlarmButton.textContent = `Alarm Set for ${alarmTime}`;
            alarmTimeInput.disabled = true;
            setAlarmButton.disabled = true;
            clearAlarmButton.disabled = false;
        }
    }
    function clearAlarm() {
        alarmTime = null;
        setAlarmButton.textContent = 'Set Alarm';
        alarmTimeInput.disabled = false;
        setAlarmButton.disabled = false;
        clearAlarmButton.disabled = true;
        stopAlarmButton.disabled = true;
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    }
    function stopAlarm() {
        clearAlarm();
    }
    setAlarmButton.addEventListener('click', setAlarm);
    clearAlarmButton.addEventListener('click', clearAlarm);
    stopAlarmButton.addEventListener('click', stopAlarm);
    setInterval(updateTime, 1000);
});