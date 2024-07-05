import AddCard from "./HomeComponents/AddCard";
import HomePage from "./HomePage";
import ProductDisplay from "./ProductDisplay";
import Product_Filters from "./Product_Filters";
import Checking from "./Delivary/Checking";
import Payment from "./Delivary/Payment";
import CreateNewAccount from "./Accounts/CreateNewAccount";
import Login from "./Accounts/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./Delivary/Order";
import Book from "./Delivary/Book";
import Forget from "./Forget";
import Status from "./Delivary/Status";
import ProductListDisply from './HomeComponents/ProductsListDisply.jsx'
// import RefoundCheck from './Delivary/RefundCheck.jsx'
// import RefundStatus from "./Delivary/refundCheck.jsx";
import RefoundStatus from "./RefoundStatus.jsx";
import StatusUpdatePage from "./StatusUpdatePage.jsx";




function App() {

  return (
    <div className="App">  
    <BrowserRouter>
      <Routes>
           {/* <Route path="/" element={<RefoundStatus/>}/> */}
           <Route path="/List" element={<ProductListDisply/>}/>
          <Route path='/Reg' element={<CreateNewAccount />} />
          <Route path='/Home' element={<HomePage />} />
          
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Product' element={<Product_Filters />} />
          <Route path='/Addcard' element={<AddCard />} />
          <Route path='/Orders' element={<Order/>} />
          <Route path='/Dis' element={<ProductDisplay/>}/>
          <Route path='/Check' element={<Checking/>}/>
          <Route path='/Pay' element={<Payment/>}/>
          <Route path='/Order' element={<Order/>}/>
          <Route path='/Book' element={<Book/>}/>
          <Route path='/For' element={<Forget/>}/>
          <Route path='/Sta' element={<Status />}/>
          <Route path='/Login' element={<Login />} />
          {localStorage.getItem('email')?<Route path='/' element={<HomePage/>}/>:<Route path='/' element={<Login/>}/>}
      </Routes>

      </BrowserRouter>
     
     
    
<>

</>
    </div>
  );
}

export default App;


// const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

{/* <Button variant="primary" onClick={handleShow}>
        Open modal for @mdo
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Recipient:
              </label>
              <input type="text" className="form-control" id="recipient-name" />
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <textarea className="form-control" id="message-text" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Send message
          </Button>
        </Modal.Footer>
      </Modal> */}
