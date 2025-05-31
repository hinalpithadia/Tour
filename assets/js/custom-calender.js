function datePicker() {
  return {
    startDate: "",
    endDate: "",
    calendarInstance: null,
    calendarVisible: false,

    init() {
      const calendarElement = document.querySelector("#flatpickr-calendar");

      // Destroy previous instance if exists
      if (calendarElement._flatpickr) {
        calendarElement._flatpickr.destroy();
      }

      this.calendarInstance = flatpickr(calendarElement, {
        inline: true,
        mode: "range",
        dateFormat: "Y-m-d",
        animate: true,
        showMonths: 2, // Display 2 months
        
        onChange: (selectedDates) => {
          if (selectedDates.length === 2) {
            this.startDate = flatpickr.formatDate(selectedDates[0], "Y-m-d");
            this.endDate = flatpickr.formatDate(selectedDates[1], "Y-m-d");
          } else if (selectedDates.length === 1) {
            this.startDate = flatpickr.formatDate(selectedDates[0], "Y-m-d");
            this.endDate = "";
          }
        },
      });

      // Close calendar when clicking outside
      document.addEventListener("click", (event) => {
        const isClickInside =
          calendarElement.contains(event.target) ||
          document.querySelector("[x-data]").contains(event.target);

        if (!isClickInside) {
          this.hideCalendar();
        }
      });

      // Clear button functionality
      document.getElementById("clearButton").addEventListener("click", () => {
        this.clearAll();
      });
    },

    showCalendar() {
      this.calendarVisible = true;
      document.querySelector("#flatpickr-calendar").style.display = "block";
    },

    hideCalendar() {
      this.calendarVisible = false;
      document.querySelector("#flatpickr-calendar").style.display = "none";
    },

    setPredefinedDates(option) {
      const today = new Date();
      let start, end;

      switch (option) {
        case "yesterday":
          end = new Date(today);
          start = new Date(today);
          start.setDate(today.getDate() - 1);
          break;
        case "last7days":
          end = new Date(today);
          start = new Date(today);
          start.setDate(today.getDate() - 7);
          break;
        case "last15days":
          end = new Date(today);
          start = new Date(today);
          start.setDate(today.getDate() - 15);
          break;
        case "last30days":
          end = new Date(today);
          start = new Date(today);
          start.setDate(today.getDate() - 30);
          break;
        case "last3months":
          end = new Date(today);
          start = new Date(today);
          start.setMonth(today.getMonth() - 3);
          break;
      }

      this.startDate = flatpickr.formatDate(start, "Y-m-d");
      this.endDate = flatpickr.formatDate(end, "Y-m-d");

      if (this.calendarInstance) {
        this.calendarInstance.setDate([start, end]);
        this.calendarInstance.jumpToDate(start);
      }

      this.showCalendar();
    },

    clearAll() {
      this.startDate = "";
      this.endDate = "";

      if (this.calendarInstance) {
        this.calendarInstance.clear();
      }

      this.showCalendar();
    },
  };
}

document.addEventListener("alpine:init", () => {
  Alpine.data("datePicker", datePicker);
});
