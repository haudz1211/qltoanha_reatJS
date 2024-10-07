import React, { useState, useEffect } from 'react';
import '../css/company.css';
import '../css/form.css';
import '../css/dialog.css';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany, createNewCompany, updateCompany, deleteCompany } from '../redux/actions/company';

const Company = () => {
    const [isShow, setIsShow] = useState(false);
    const data = useSelector(state => state.company.data);
    const [companies, setCompanies] = useState(data);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [indexEditCompany, setIndexEditCompany] = useState(null);
    const [nameSearch, setNameSearch] = useState("");
    const [isPhone, setIsPhone] = useState(true);
    const [isEmail, setIsEmail] = useState(true); // Trạng thái kiểm tra email
    const userRole = useSelector(state => state.auth?.userRole);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCompany());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        setCompanies(data);
    }, [data]);

    const validatePhone = (phoneNumber) => {
        var regPhone = /^\d{10}$/;
        return phoneNumber.match(regPhone);
    };

    const validateEmail = (email) => {
        var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.match(regEmail);
    };

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditCompany(index);
        document.getElementById('name').value = companies[index].name;
        document.getElementById('tax-code').value = companies[index].taxCode;
        document.getElementById('active-field').value = companies[index].activeField;
        document.getElementById('authorized-capital').value = companies[index].authorizedCapital;
        document.getElementById('phone-no').value = companies[index].phoneNo;
        document.getElementById('email').value = companies[index].email; // Lấy giá trị email
        document.querySelector('.form-post').classList.add('active');
    };

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');

        // Reset các trường nhập liệu
        document.getElementById('name').value = '';
        document.getElementById('tax-code').value = '';
        document.getElementById('active-field').value = '';
        document.getElementById('authorized-capital').value = '';
        document.getElementById('phone-no').value = '';
        document.getElementById('email').value = ''; // Reset email
        setIsPhone(true);
        setIsEmail(true); // Reset trạng thái kiểm tra email

        if (mode === "edit") {
            document.querySelector('.dialog__title').textContent = "Sửa thông tin công ty";
        } else {
            document.querySelector('.dialog__title').textContent = "Thêm mới công ty";
        }
    };

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    };

    const addOrUpdateItem = () => {
        setIsPhone(true);
        setIsEmail(true); // Reset trạng thái kiểm tra email
        if (isAdd) {
            addItem();
        } else {
            editCompany();
        }
    };

    const editCompany = () => {
        const name = document.getElementById('name').value;
        const taxCode = document.getElementById('tax-code').value;
        const activeField = document.getElementById('active-field').value;
        const authorizedCapital = document.getElementById('authorized-capital').value;
        const phoneNo = document.getElementById('phone-no').value;
        const email = document.getElementById('email').value; // Lấy giá trị email
        const validatePhoneNumber = validatePhone(phoneNo);
        const validateEmailAddress = validateEmail(email);
        setIsPhone(validatePhoneNumber);
        setIsEmail(validateEmailAddress);
        if (!validatePhoneNumber || !validateEmailAddress) return;

        const data = {
            name: name,
            taxCode: taxCode,
            activeField: activeField,
            authorizedCapital: Number(authorizedCapital),
            phoneNo: phoneNo,
            email: email // Thêm email vào data
        };

        dispatch(updateCompany(companies[indexEditCompany].id, data));
        let tmpCompanies = [...companies];
        tmpCompanies[indexEditCompany] = { ...tmpCompanies[indexEditCompany], ...data };
        setCompanies(tmpCompanies);
        cancelClick();
    };

    const removeCompany = (id) => {
        if (id) {
            dispatch(deleteCompany(id));
            const tmpCompanies = companies.filter(com => com.id !== id);
            setCompanies(tmpCompanies);
        }
    };

    const addItem = () => {
        const name = document.getElementById('name').value;
        const taxCode = document.getElementById('tax-code').value;
        const activeField = document.getElementById('active-field').value;
        const authorizedCapital = document.getElementById('authorized-capital').value;
        const phoneNo = document.getElementById('phone-no').value;
        const email = document.getElementById('email').value; // Lấy giá trị email
        const validatePhoneNumber = validatePhone(phoneNo);
        const validateEmailAddress = validateEmail(email);
        setIsPhone(validatePhoneNumber);
        setIsEmail(validateEmailAddress);
        if (!validatePhoneNumber || !validateEmailAddress) return;

        const data = {
            name: name,
            taxCode: taxCode,
            activeField: activeField,
            authorizedCapital: Number(authorizedCapital),
            phoneNo: phoneNo,
            email: email // Thêm email vào data
        };

        dispatch(createNewCompany(data))
            .then(() => {
                // Reset các trường trong form về giá trị mặc định
                document.getElementById('name').value = '';
                document.getElementById('tax-code').value = '';
                document.getElementById('active-field').value = '';
                document.getElementById('authorized-capital').value = '';
                document.getElementById('phone-no').value = '';
                document.getElementById('email').value = ''; // Reset email

                // Tải lại danh sách công ty
                dispatch(getAllCompany());
                cancelClick();
            })
            .catch(error => {
                console.error("Error adding company:", error);
            });
        cancelClick();
    };

    const viewEmployee = (id) => {
        window.location.href = `/employees/${id}`;
    };

    const searchCompany = () => {
        if (nameSearch.trim().length === 0) {
            setCompanies(data);
            return;
        }
        const tmpCompanies = companies.filter(emp => emp.name.includes(nameSearch.trim()));
        setCompanies(tmpCompanies);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Thêm mới công ty
                    </div>
                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='name' placeholder="Name" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='tax-code' placeholder="Tax code" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='active-field' placeholder="Active Field" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='authorized-capital' placeholder="Authorized Capital" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='phone-no' placeholder="Phone No" />
                                <span style={{ display: isPhone ? "none" : "" }} className='validate-phone'>Sai định dạng số điện thoại</span>
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='email' placeholder="Email" />
                                <span style={{ display: isEmail ? "none" : "" }} className='validate-email'>Sai định dạng email</span>
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
                            Danh sách công ty
                        </div>
                        <form action="javascript:" className="search-bar">
                            <input placeholder='Tìm kiếm công ty theo tên' type="search" name="search" pattern=".*\S.*" required onChange={(e) => setNameSearch(e.target.value)} />
                            <button onClick={() => searchCompany()} className="search-btn" type="submit">
                                <span>Search</span>
                            </button>
                        </form>
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <button onClick={() => popUpActive()}>
                                Thêm công ty
                            </button>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{ width: '450px' }}>Tên</th>
                                    <th style={{ width: '200px' }}>Mã số thuế</th>
                                    <th style={{ width: '500px' }}>Lĩnh vực hoạt động</th>
                                    <th style={{ width: '200px' }}>Vốn điều lệ</th>
                                    <th style={{ width: '150px' }}>Số điện thoại</th>
                                    <th style={{ width: '200px' }}>Email</th> {/* Thêm cột Email */}
                                    <th style={{ width: '200px' }}>Số nhân viên</th>
                                    <th style={{ width: '300px' }}>Tổng diện tích thuê</th>
                                    <th style={{ width: '90px' }}>Xem Nhân viên</th>
                                    <th style={{ width: '80px' }}>Sửa</th>
                                    <th style={{ width: '80px' }}>Xóa</th>
                                </tr>
                                {
                                    companies?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.taxCode}</td>
                                            <td>{item?.activeField}</td>
                                            <td>{new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(item?.authorizedCapital)}</td>
                                            <td>{item?.phoneNo}</td>
                                            <td>{item?.email}</td> {/* Hiển thị email */}
                                            <td>{item?.numberOfEmployee}</td>
                                            <td>{item?.sumOfRentedArea}</td>
                                            <td>
                                                <button onClick={() => viewEmployee(item.id)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i> Xem
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeCompany(item.id)}>
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
    );
};

export default Company;
