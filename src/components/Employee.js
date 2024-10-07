import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { getCompaniesForRegistrationByName, saveCompanyToRedux,getAllCompanyForRegistration} from '../redux/actions/registed_service';
import { Link } from 'react-router-dom';
import '../css/search_bar.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany, createNewCompany, updateCompany, deleteCompany } from '../redux/actions/company';
import { createEmployee, deleteEmployee, getAllEmployeeBy, updateEmployee } from '../redux/actions/empoyee';

const Employee = () => {
    const [isShow, setIsShow] = useState(false)
    const data = useSelector(state => state.employee.data)
    const [employees, setEmployees] = useState(data);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [indexEditEmployee, setIndexEditEmployee] = useState(null);
    const [companyId, setCompanyId] = useState(0);
    const [nameSearch, setNameSearch] = useState("");
    const [isPhone, setIsPhone] = useState(true);

    const dispatch = useDispatch();


    useEffect(() => {
    const id = location.pathname.split('/')[2];  // Lấy companyId từ URL
    setCompanyId(Number(id));
    dispatch(getAllEmployeeBy(Number(id)));  // Gọi API lấy nhân viên thuộc công ty với companyId
}, [location.pathname, dispatch]);


    useEffect(() => {
        setEmployees(data);
    }, [data])

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditEmployee(index);
        
        // Đảm bảo bạn đang lấy giá trị đúng
        document.getElementById('name').value = employees[index].name;
        document.getElementById('date').value = employees[index].dateOfBirth.split("T")[0]; // Chỉ lấy phần ngày
        document.getElementById('socialId').value = employees[index].socialId;
        document.getElementById('phone-no').value = employees[index].phoneNo;
    
        document.querySelector('.form-post').classList.add('active');
    }
    

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if (mode === "edit") {
            document.querySelector('.dialog__title').textContent = "Sửa thông tin công ty";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm mới công ty";
        }
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    
        // Reset input fields
        document.getElementById('name').value = '';
        document.getElementById('date').value = '';
        document.getElementById('socialId').value = '';
        document.getElementById('phone-no').value = '';
    }
    

    const addOrUpdateItem = () => {
        setIsPhone(true);
        if (isAdd) {
            addItem();
        }
        else {
            editEmployee();
        }

    }

    const editEmployee = () => {
        const name = document.getElementById('name').value;
        const dateOfBirth = document.getElementById('date').value; // Giữ nguyên giá trị nhập vào
        const socialId = document.getElementById('socialId').value;
        const phoneNo = document.getElementById('phone-no').value;
        const validate = validatePhone(phoneNo);
        setIsPhone(validate);
        if (!validate) return;
    
        const data = {
            name: name,
            dateOfBirth: dateOfBirth, // Giữ nguyên giá trị này
            socialId: socialId,
            phoneNo: phoneNo,
            company: employees[indexEditEmployee].company
        };
        
        // Gọi action cập nhật nhân viên
        dispatch(updateEmployee(employees[indexEditEmployee].id, data));
    
        // Cập nhật danh sách nhân viên trong state
        let tmpEmployees = [...employees]; // Sử dụng spread operator để sao chép mảng
        tmpEmployees[indexEditEmployee] = {
            ...tmpEmployees[indexEditEmployee], // Giữ nguyên các trường khác
            name: name,
            dateOfBirth: dateOfBirth, // Cập nhật ngày sinh
            socialId: socialId,
            phoneNo: phoneNo,
            company: employees[indexEditEmployee].company,
        };
        setEmployees(tmpEmployees);
        cancelClick();
    }
    
    const removeEmployee = (id) => {
        if (id) {
            dispatch(deleteEmployee(id));
            const tmpEmployees = employees.filter(emp => emp.id != id);
            setEmployees(tmpEmployees);
        }
    }

    const validatePhone = (phoneNumber) => {
        var regPhone = /^\d{10}$/;
        return phoneNumber.match(regPhone);
    }

    const addItem = () => {
        const name = document.getElementById('name').value;
        const dateOfBirth = document.getElementById('date').value;
        const socialId = document.getElementById('socialId').value;
        const phoneNo = document.getElementById('phone-no').value;
        
        // Validate phone number
        const validate = validatePhone(phoneNo);
        setIsPhone(validate);
        if (!validate) return; // Dừng nếu số điện thoại không hợp lệ
    
        const data = {
            name: name,
            dateOfBirth: new Date(dateOfBirth), // Nếu bạn đang sử dụng kiểu ngày, hãy đảm bảo định dạng đúng
            socialId: socialId,
            phoneNo: phoneNo
        };
        dispatch(createEmployee(data, companyId))
        .then(() => {
            // Sau khi thêm thành công, reset form
            document.getElementById('name').value = '';
            document.getElementById('date').value = '';
            document.getElementById('socialId').value = '';
            document.getElementById('phone-no').value = '';
            // Cập nhật danh sách nhân viên
            dispatch(getAllEmployeeBy(companyId));
        })
        .catch(error => {
            console.error("Error adding employee:", error);
        });
        // Gọi action để thêm nhân viên
        dispatch(createEmployee(data, companyId)); // Kiểm tra xem action này đã được định nghĩa và hoạt động chưa
        
        // Reset form sau khi thêm
        cancelClick(); 
    }
    

    const searchEmployee = () => {
        if(nameSearch.trim().length == 0)
            return;
        const tmpEmployees = employees.filter(emp => emp.name.includes(nameSearch.trim()));
        setEmployees(tmpEmployees);
    }


    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Thêm mới nhân viên
                    </div>
                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='name' placeholder="Họ và tên" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="date" id='date' placeholder="" />
                                <span style={{display: "none"}}>Vui lòng nhập đúng định dạng</span>
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='socialId' placeholder="Mã nhân viên"/>
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='phone-no' placeholder="SĐT" />
                                <span style={{display: isPhone ? "none" : ""}} className='validate-phone'>Sai định dạng số điện thoại</span>
                            </div>
                        </div>
                        <div className="form-post__control">
                            <button onClick={() => cancelClick()} className="cancel-btn">
                                Hủy
                            </button>
                            <button className="add-section-btn" onClick={() => addOrUpdateItem()}>
                                <i className='bx bx-save'></i>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Danh sách nhân viên
                        </div>
                        <form action="javascript:" class="search-bar">
                            <input placeholder='Tìm kiếm nhân viên theo tên' type="search" name="search" pattern=".*\S.*" required onChange={(e) => setNameSearch(e.target.value)}/>
                            <button onClick={() => searchEmployee()} class="search-btn" type="submit">
                                <span>Search</span>
                            </button>
                        </form> 
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <button onClick={() => popUpActive()}>
                                Thêm nhân viên
                            </button>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{ width: '200px' }}>Tên</th>
                                    <th style={{ width: '200px' }}>Mã nhân viên</th>
                                    <th style={{ width: '200px' }}>Số điện thoại</th>
                                    <th style={{ width: '200px' }}>Ngày sinh</th>
                                    <th style={{ width: '105px' }}>Sửa</th>
                                    <th style={{ width: '105px' }} >Xóa</th>
                                </tr>
                                {
                                    employees?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.socialId}</td>
                                            <td>{item?.phoneNo}</td>
                                            <td>{item?.dateOfBirth?.split("T")[0]}</td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeEmployee(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Employee;