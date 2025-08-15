
abstract class Movie {
    id: number;
    title: string;
    genre: string;
    ticketPrice: number;
    isShowing: boolean;

    constructor(id: number, title: string, genre: string, ticketPrice: number, isShowing: boolean) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.ticketPrice = ticketPrice;
        this.isShowing = isShowing;
    }

    startShow() {
        this.isShowing = true;
    }
    stopShow() {
        this.isShowing = false;
    }

    abstract calculateTicketCost(quantity: number): number;
    abstract getSpecialOffers(): string[];
    abstract getMovieInfo(): string;
}

class ActionMovie extends Movie {
    calculateTicketCost(quantity: number): number {
        return this.ticketPrice * quantity;
    }
    getSpecialOffers(): string[] {
        return ["Miễn phí bắp rang", "Tặng poster"];
    }
    getMovieInfo(): string {
        return "Phim hành động gay cấn, kỹ xảo hoành tráng";
    }
}

class ComedyMovie extends Movie {
    calculateTicketCost(quantity: number): number {
        return this.ticketPrice * quantity;
    }
    getSpecialOffers(): string[] {
        return ["Giảm 10% cho nhóm trên 4 người"];
    }
    getMovieInfo(): string {
        return "Phim hài nhẹ nhàng, vui nhộn";
    }
}

class AnimationMovie extends Movie {
    calculateTicketCost(quantity: number): number {
        return this.ticketPrice * quantity;
    }
    getSpecialOffers(): string[] {
        return ["Giảm giá cho trẻ em dưới 12 tuổi"];
    }
    getMovieInfo(): string {
        return "Phim hoạt hình với hình ảnh sống động";
    }
}

class Audience {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    getDetails() {
        return `ID: ${this.id}, Tên: ${this.name}, Email: ${this.email}, Phone: ${this.phone}`;
    }
}

class TicketBooking {
    bookingId: number;
    audience: Audience;
    movie: Movie;
    quantity: number;
    totalPrice: number;

    constructor(bookingId: number, audience: Audience, movie: Movie, quantity: number) {
        this.bookingId = bookingId;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = movie.calculateTicketCost(quantity);
    }

    getDetails() {
        return `BookingID: ${this.bookingId}, Khán giả: ${this.audience.name}, Phim: ${this.movie.title}, Vé: ${this.quantity}, Tổng: ${this.totalPrice}`;
    }
}

class Cinema {
    movies: Movie[] = [];
    audiences: Audience[] = [];
    bookings: TicketBooking[] = [];

    addMovie(movie: Movie): void {
        this.movies.push(movie);
    }

    addAudience(name: string, email: string, phone: string): Audience {
        let newAudience = new Audience(this.audiences.length + 1, name, email, phone);
        this.audiences.push(newAudience);
        return newAudience;
    }

    bookTickets(audienceId: number, movieId: number, quantity: number): TicketBooking | null {
        let audience = this.findAudienceById(this.audiences, audienceId);
        let movie = this.findMovieById(this.movies, movieId);
        if (audience && movie && movie.isShowing) {
            let booking = new TicketBooking(this.bookings.length + 1, audience, movie, quantity);
            this.bookings.push(booking);
            return booking;
        }
        return null;
    }

    cancelMovie(movieId: number): void {
        let movie = this.findMovieById(this.movies, movieId);
        if (movie) {
            movie.stopShow();
        }
    }

    listShowingMovies(): void {
        let showingMovies = this.movies.filter(m => m.isShowing);
        showingMovies.forEach(m => console.log(`${m.id} - ${m.title} (${m.genre})`));
    }

    listAudienceBookings(audienceId: number): void {
        let bookings = this.bookings.filter(b => b.audience.id === audienceId);
        bookings.forEach(b => console.log(b.getDetails()));
    }

    calculateTotalRevenue(): number {
        return this.bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    }

    getMovieGenreCount(): void {
        let genreCount: { [key: string]: number } = {};
        this.movies.forEach(m => {
            genreCount[m.genre] = (genreCount[m.genre] || 0) + 1;
        });
        console.log(genreCount);
    }

    getMovieSpecialOffers(movieId: number): void {
        let movie = this.findMovieById(this.movies, movieId);
        if (movie) {
            console.log(movie.getSpecialOffers());
        }
    }

    findMovieById(collection: Movie[], id: number): Movie | undefined {
        return collection.find(m => m.id === id);
    }

    findAudienceById(collection: Audience[], id: number): Audience | undefined {
        return collection.find(a => a.id === id);
    }

    findTicketBookingById(collection: TicketBooking[], id: number): TicketBooking | undefined {
        return collection.find(b => b.bookingId === id);
    }
}
let cinema = new Cinema();
let choice: number;

do {
    console.log(`
1. Thêm khán giả
2. Thêm phim
3. Đặt vé
4. Ngừng chiếu phim
5. Hiển thị phim đang chiếu
6. Xem đặt vé của khán giả
7. Tính tổng doanh thu
8. Đếm số phim theo thể loại
9. Tìm kiếm phim theo ID
10. Xem ưu đãi phim
11. Thoát
    `);

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
