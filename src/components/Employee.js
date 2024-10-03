import React, { useState, useEffect } from 'react';
import '../css/company.css';
import '../css/form.css';
import '../css/dialog.css';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, deleteEmployee, getAllEmployeeBy, updateEmployee } from '../redux/actions/empoyee'; // Sửa typo trong import
import '../css/search_bar.css';
import axios from 'axios';

const Employee = () => {
    const [isShow, setIsShow] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [isAdd, setIsAdd] = useState(true);
    const [indexEditEmployee, setIndexEditEmployee] = useState(null);
    const [companyId, setCompanyId] = useState(0);
    const [nameSearch, setNameSearch] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(true);

    const dispatch = useDispatch();
    const data = useSelector(state => state.employee.data);
    console.log("Dữ liệu nhân viên:", data); // Kiểm tra dữ liệu trong component

    const location = useLocation();

    useEffect(() => {
        const id = location.pathname.split('/')[2]; // Lấy companyId từ URL
        setCompanyId(Number(id)); // Đảm bảo companyId là số
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`/api/company-employee/company/${id}`);
                console.log("Dữ liệu nhân viên nhận được:", response.data); // Xem dữ liệu
                // dispatch để lưu dữ liệu vào Redux
            } catch (error) {
                console.error("Có lỗi xảy ra khi gọi API:", error);
            }
        };
        fetchEmployees();
    }, [location.pathname]);
    
    
    useEffect(() => {
        setEmployees(data); // Cập nhật state employees khi data thay đổi
    }, [data]);
    
    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditEmployee(index);
        const employee = employees[index];
        document.getElementById('name').value = employee.name;
        document.getElementById('date').value = employee.dateOfBirth.split("T")[0]; // Sửa định dạng
        document.getElementById('socialId').value = employee.socialId;
        document.getElementById('phone-no').value = employee.phoneNo;
        document.querySelector('.form-post').classList.add('active');
    };

    const openModal = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        document.querySelector('.dialog__title').textContent = mode === "edit" ? "Sửa thông tin nhân viên" : "Thêm mới nhân viên";
    };

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(true); // Đặt lại chế độ thêm
        setIndexEditEmployee(null); // Đặt lại chỉ số nhân viên
        document.querySelector('.form-post').classList.remove('active');
        clearFormFields(); // Xóa dữ liệu trong form
    };

    const addOrUpdateEmployee = () => {
        const employeeData = getEmployeeFormData();
        if (!validatePhone(employeeData.phoneNo)) return;

        if (isAdd) {
            dispatch(createEmployee(employeeData)).then(() => {
                cancelClick();
            });
        } else {
            dispatch(updateEmployee(employees[indexEditEmployee].id, employeeData)).then(() => {
                cancelClick();
            });
        }
    };

    const removeEmployee = (id) => {
        if (id) {
            dispatch(deleteEmployee(id));
        }
    };

    const validatePhone = (phoneNumber) => {
        const regPhone = /^\d{10}$/;
        setIsPhoneValid(regPhone.test(phoneNumber));
        return regPhone.test(phoneNumber);
    };

    const getEmployeeFormData = () => ({
        name: document.getElementById('name').value,
        dateOfBirth: document.getElementById('date').value,
        socialId: document.getElementById('socialId').value,
        phoneNo: document.getElementById('phone-no').value,
        companyId: companyId // Sử dụng companyId
    });

    const clearFormFields = () => {
        document.getElementById('name').value = '';
        document.getElementById('date').value = '';
        document.getElementById('socialId').value = '';
        document.getElementById('phone-no').value = '';
    };

    const searchEmployee = () => {
        if (nameSearch.trim().length === 0) {
            setEmployees(data); // Nếu không có tìm kiếm, hiển thị tất cả nhân viên
            return;
        }
        // Tìm kiếm nhân viên theo tên
        setEmployees(data.filter(emp => emp.name.toLowerCase().includes(nameSearch.trim().toLowerCase())));
    };

    return (
        <div style={{ position: 'relative' }}>
            {isShow && (
                <div className="modal">
                    <div className="modal_overlay"></div>
                    <div className="form-post">
                        <div className="form-post__title dialog__title">
                            {isAdd ? "Thêm mới nhân viên" : "Sửa thông tin nhân viên"}
                        </div>
                        <div className="form-post__content">
                            <div className="form-post__wrapper">
                                <div className="form-post__field">
                                    <input style={{ width: '100%' }} type="text" id='name' placeholder="Họ và tên" />
                                </div>
                                <div className="form-post__field">
                                    <input style={{ width: '100%' }} type="date" id='date' placeholder="" />
                                </div>
                                <div className="form-post__field">
                                    <input style={{ width: '100%' }} type="text" id='socialId' placeholder="Mã nhân viên" />
                                </div>
                                <div className="form-post__field">
                                    <input style={{ width: '100%' }} type="text" id='phone-no' placeholder="SĐT" />
                                    {!isPhoneValid && <span className='validate-phone'>Sai định dạng số điện thoại</span>}
                                </div>
                            </div>
                            <div className="form-post__control">
                                <button onClick={cancelClick} className="cancel-btn">
                                    Hủy
                                </button>
                                <button className="add-section-btn" onClick={addOrUpdateEmployee}>
                                    <i className='bx bx-save'></i>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Danh sách nhân viên
                        </div>
                        <form action="javascript:" className="search-bar" onSubmit={e => e.preventDefault()}>
                            <input placeholder='Tìm kiếm nhân viên theo tên' type="search" required onChange={(e) => setNameSearch(e.target.value)} />
                            <button onClick={searchEmployee} className="search-btn" type="button">
                                <span>Tìm kiếm</span>
                            </button>
                        </form>
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <button onClick={() => openModal()}>
                                Thêm nhân viên
                            </button>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        {employees.length === 0 ? (
                            <p>Không có nhân viên nào.</p>
                        ) : (
                            <table id="admin-post__table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên</th>
                                        <th style={{ width: '200px' }}>Mã nhân viên</th>
                                        <th style={{ width: '200px' }}>Số điện thoại</th>
                                        <th style={{ width: '200px' }}>Ngày sinh</th>
                                        <th style={{ width: '105px' }}>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.socialId}</td>
                                            <td>{item.phoneNo}</td>
                                            <td>{item.dateOfBirth.split("T")[0]}</td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                                <button className="post-delete-btn" onClick={() => removeEmployee(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
