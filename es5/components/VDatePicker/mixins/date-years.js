export default {
  methods: {
    genYears: function genYears() {
      return this.$createElement('ul', {
        staticClass: 'picker--date__years',
        key: 'year',
        ref: 'years'
      }, this.genYearItems());
    },
    yearClick: function yearClick(year) {
      var _this = this;

      if (this.type === 'year') {
        this.inputDate = '' + year;
        this.$nextTick(function () {
          return _this.autosave && _this.save();
        });
      } else if (this.type === 'month') {
        var date = this.sanitizeDateString(year + '-' + (this.month + 1), 'month');
        if (this.isAllowed(date)) this.inputDate = date;
        this.tableDate = '' + year;
        this.activePicker = 'MONTH';
      } else {
        var _date = this.sanitizeDateString(year + '-' + (this.tableMonth + 1) + '-' + this.day, 'date');
        if (this.isAllowed(_date)) this.inputDate = _date;
        this.tableDate = year + '-' + (this.tableMonth + 1);
        this.activePicker = 'MONTH';
      }
    },
    genYearItems: function genYearItems() {
      var _this2 = this;

      var children = [];

      var _loop = function _loop(year, length) {
        var buttonText = _this2.formatters.year('' + year);

        children.push(_this2.$createElement('li', {
          'class': _this2.year === year ? _this2.addTextColorClassChecks({ active: true }) : {},
          on: {
            click: function click() {
              return _this2.yearClick(year);
            }
          }
        }, buttonText));
      };

      for (var year = this.year + 100, length = this.year - 100; year > length; year--) {
        _loop(year, length);
      }
      return children;
    }
  }
};