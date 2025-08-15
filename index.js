var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Movie = /** @class */ (function () {
    function Movie(id, title, genre, ticketPrice, isShowing) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.ticketPrice = ticketPrice;
        this.isShowing = isShowing;
    }
    Movie.prototype.startShow = function () {
        this.isShowing = true;
    };
    Movie.prototype.stopShow = function () {
        this.isShowing = false;
    };
    return Movie;
}());
var ActionMovie = /** @class */ (function (_super) {
    __extends(ActionMovie, _super);
    function ActionMovie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionMovie.prototype.calculateTicketCost = function (quantity) {
        return this.ticketPrice * quantity;
    };
    ActionMovie.prototype.getSpecialOffers = function () {
        return ["Miễn phí bắp rang", "Tặng poster"];
    };
    ActionMovie.prototype.getMovieInfo = function () {
        return "Phim hành động gay cấn, kỹ xảo hoành tráng";
    };
    return ActionMovie;
}(Movie));
var ComedyMovie = /** @class */ (function (_super) {
    __extends(ComedyMovie, _super);
    function ComedyMovie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComedyMovie.prototype.calculateTicketCost = function (quantity) {
        return this.ticketPrice * quantity;
    };
    ComedyMovie.prototype.getSpecialOffers = function () {
        return ["Giảm 10% cho nhóm trên 4 người"];
    };
    ComedyMovie.prototype.getMovieInfo = function () {
        return "Phim hài nhẹ nhàng, vui nhộn";
    };
    return ComedyMovie;
}(Movie));
var AnimationMovie = /** @class */ (function (_super) {
    __extends(AnimationMovie, _super);
    function AnimationMovie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationMovie.prototype.calculateTicketCost = function (quantity) {
        return this.ticketPrice * quantity;
    };
    AnimationMovie.prototype.getSpecialOffers = function () {
        return ["Giảm giá cho trẻ em dưới 12 tuổi"];
    };
    AnimationMovie.prototype.getMovieInfo = function () {
        return "Phim hoạt hình với hình ảnh sống động";
    };
    return AnimationMovie;
}(Movie));
var Audience = /** @class */ (function () {
    function Audience(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    Audience.prototype.getDetails = function () {
        return "ID: ".concat(this.id, ", T\u00EAn: ").concat(this.name, ", Email: ").concat(this.email, ", Phone: ").concat(this.phone);
    };
    return Audience;
}());
var TicketBooking = /** @class */ (function () {
    function TicketBooking(bookingId, audience, movie, quantity) {
        this.bookingId = bookingId;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = movie.calculateTicketCost(quantity);
    }
    TicketBooking.prototype.getDetails = function () {
        return "BookingID: ".concat(this.bookingId, ", Kh\u00E1n gi\u1EA3: ").concat(this.audience.name, ", Phim: ").concat(this.movie.title, ", V\u00E9: ").concat(this.quantity, ", T\u1ED5ng: ").concat(this.totalPrice);
    };
    return TicketBooking;
}());
var Cinema = /** @class */ (function () {
    function Cinema() {
        this.movies = [];
        this.audiences = [];
        this.bookings = [];
    }
    Cinema.prototype.addMovie = function (movie) {
        this.movies.push(movie);
    };
    Cinema.prototype.addAudience = function (name, email, phone) {
        var newAudience = new Audience(this.audiences.length + 1, name, email, phone);
        this.audiences.push(newAudience);
        return newAudience;
    };
    Cinema.prototype.bookTickets = function (audienceId, movieId, quantity) {
        var audience = this.findAudienceById(this.audiences, audienceId);
        var movie = this.findMovieById(this.movies, movieId);
        if (audience && movie && movie.isShowing) {
            var booking = new TicketBooking(this.bookings.length + 1, audience, movie, quantity);
            this.bookings.push(booking);
            return booking;
        }
        return null;
    };
    Cinema.prototype.cancelMovie = function (movieId) {
        var movie = this.findMovieById(this.movies, movieId);
        if (movie) {
            movie.stopShow();
        }
    };
    Cinema.prototype.listShowingMovies = function () {
        var showingMovies = this.movies.filter(function (m) { return m.isShowing; });
        showingMovies.forEach(function (m) { return console.log("".concat(m.id, " - ").concat(m.title, " (").concat(m.genre, ")")); });
    };
    Cinema.prototype.listAudienceBookings = function (audienceId) {
        var bookings = this.bookings.filter(function (b) { return b.audience.id === audienceId; });
        bookings.forEach(function (b) { return console.log(b.getDetails()); });
    };
    Cinema.prototype.calculateTotalRevenue = function () {
        return this.bookings.reduce(function (sum, b) { return sum + b.totalPrice; }, 0);
    };
    Cinema.prototype.getMovieGenreCount = function () {
        var genreCount = {};
        this.movies.forEach(function (m) {
            genreCount[m.genre] = (genreCount[m.genre] || 0) + 1;
        });
        console.log(genreCount);
    };
    Cinema.prototype.getMovieSpecialOffers = function (movieId) {
        var movie = this.findMovieById(this.movies, movieId);
        if (movie) {
            console.log(movie.getSpecialOffers());
        }
    };
    Cinema.prototype.findMovieById = function (collection, id) {
        return collection.find(function (m) { return m.id === id; });
    };
    Cinema.prototype.findAudienceById = function (collection, id) {
        return collection.find(function (a) { return a.id === id; });
    };
    Cinema.prototype.findTicketBookingById = function (collection, id) {
        return collection.find(function (b) { return b.bookingId === id; });
    };
    return Cinema;
}());
var cinema = new Cinema();
var choice;
do {
    console.log("\n1. Th\u00EAm kh\u00E1n gi\u1EA3\n2. Th\u00EAm phim\n3. \u0110\u1EB7t v\u00E9\n4. Ng\u1EEBng chi\u1EBFu phim\n5. Hi\u1EC3n th\u1ECB phim \u0111ang chi\u1EBFu\n6. Xem \u0111\u1EB7t v\u00E9 c\u1EE7a kh\u00E1n gi\u1EA3\n7. T\u00EDnh t\u1ED5ng doanh thu\n8. \u0110\u1EBFm s\u1ED1 phim theo th\u1EC3 lo\u1EA1i\n9. T\u00ECm ki\u1EBFm phim theo ID\n10. Xem \u01B0u \u0111\u00E3i phim\n11. Tho\u00E1t\n    ");
    choice = Number(prompt("Nhập lựa chọn:"));
    switch (choice) {
        case 1:
            cinema.addAudience("Tuan", "tuan@gmail.com", "0123456789");
            console.log("Đã thêm khán giả");
            break;
        case 2:
            cinema.addMovie(new ActionMovie(1, "Võ Lâm Truyền Kỳ", "Hành động", 50000, true));
            cinema.addMovie(new ComedyMovie(2, "Cười Xuyên Việt", "Hài", 40000, true));
            cinema.addMovie(new AnimationMovie(3, "Doraemon", "Hoạt hình", 30000, true));
            console.log("Đã thêm phim");
            break;
        case 3:
            cinema.bookTickets(1, 1, 3);
            console.log("Đã đặt vé");
            break;
        case 4:
            cinema.cancelMovie(1);
            console.log("Đã ngừng chiếu");
            break;
        case 5:
            cinema.listShowingMovies();
            break;
        case 6:
            cinema.listAudienceBookings(1);
            break;
        case 7:
            console.log("Tổng doanh thu:", cinema.calculateTotalRevenue());
            break;
        case 8:
            cinema.getMovieGenreCount();
            break;
        case 9:
            console.log(cinema.findMovieById(cinema.movies, 1));
            break;
        case 10:
            cinema.getMovieSpecialOffers(1);
            break;
        case 11:
            console.log("Thoát");
            break;
        default:
            console.log("Lựa chọn không hợp lệ");
    }
} while (choice !== 11);
