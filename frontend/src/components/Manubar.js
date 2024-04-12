import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckLogin from './checklogin'

function Manubar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100px' }}>

      <Stack direction="horizontal" gap={3} style={{ backgroundColor: 'pink', flexDirection: 'row', display: 'flex' ,padding:'20px' }}>
        <img src="http://localhost/logo.jpg" alt="logo cathotel" width="200" height="100"/>

        
      
     
      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        title="จัดการที่พัก"
        className="mt-2"
        data-bs-theme="dark"
      >

        <Dropdown.Item href="/booking/manament">จองที่พัก</Dropdown.Item>
        <Dropdown.Item href="/booking/edit">แก้ไขการจอง</Dropdown.Item>
        <Dropdown.Item href="/booking/delete">ยกเลิกการจอง</Dropdown.Item>
      </DropdownButton>

      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        title="จัดการห้อง"
        className="mt-2"
        data-bs-theme="dark"
      >
  
        <Dropdown.Item href="/room/create">เพิ่มห้องพัก</Dropdown.Item>
        <Dropdown.Item href="/room/edit">แก้ไขห้องพัก</Dropdown.Item>
        <Dropdown.Item href="/room/delete">ลบห้องพัก</Dropdown.Item>
        
      </DropdownButton>
      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        title="ข้อมูลสมาชิค"
        className="mt-2"
        data-bs-theme="dark"
      >
        <Dropdown.Item href="/member/create">เพิ่มสมาชิค</Dropdown.Item>
        <Dropdown.Item href="/member/edit">แก้ไขสมาชิค</Dropdown.Item>
        <Dropdown.Item href="/member/delete">ลบสมาชิค</Dropdown.Item>
        
      </DropdownButton>
      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        title="Invote/ใบกำกับภาษี"
        className="mt-2"
        data-bs-theme="dark"
      >

        <Dropdown.Item href="/invoice/print">พิมพ์ใบกำกับภาษี</Dropdown.Item>
        <Dropdown.Item href="/invoice/editbill">แก้ไขใบกำกับภาษี</Dropdown.Item>
        <Dropdown.Item href="/invoice/delete">ลบข้อมูลใบกำกับภาษี</Dropdown.Item>
        <Dropdown.Item href="/invoice/editaddress">แก้ไขที่อยู่</Dropdown.Item>
        
      </DropdownButton>
      <div style={{ backgroundColor: 'pink', color: 'white', width: '100%', justifyContent: 'flex-end' ,textAlign:'end',padding:'20px'}}>
        <CheckLogin />
      </div>

      </Stack>

    </div>
    
  );
}

export default Manubar;

// <Route path="booking/manament" element = {<ManageRoom/>}/>
// <Route path="booking/edit" element = {<ManageRoom/>}/>
// <Route path="booking/delete" element = {<ManageRoom/>}/>

// <Route path="room/create" element={<Booking />} />
// <Route path="room/edit" element={<Invoice />} />
// <Route path="room/delete" element={<EditDBMember />} />

// <Route path="member/create" element={<Invoice />} />
// <Route path="member/edit" element={<CreateRoom/>}/> 
// <Route path="member/delete" element={<CreateRoom/>}/> 

// <Route path="invoice/print" element = {<ManageRoom/>}/>
// <Route path="invoice/editbill" element = {<ManageRoom/>}/>
// <Route path="invoice/editaddress" element = {<ManageRoom/>}/>
