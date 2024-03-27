import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";

export default function Layout(props) {
  return (
    <div>
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
}
