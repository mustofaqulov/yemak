import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header count2={()=>{}}/>
        <main>{children}</main>
      <Footer />
    </>
  );
}
