import Footer from '~/Components/Layout/Footer/Footer';
import Header from '~/Components/Layout/Header/Header';

function Home() {
    return (
        <div className="">
            <header>
                <Header />
            </header>
            <article>
                <h1 className="text-center">Home Page</h1>
            </article>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Home;
