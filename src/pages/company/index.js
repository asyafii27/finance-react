import React, { useEffect, useState } from 'react';
import TableData from '../../components/Table';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar/Navbar';
import Pagination from '../../components/pagination/Pagination';
import CardHeader from '../../components/navbar/CardHeaderTitle';
import CreateCompanyModal from './CompanyCreate.js';
import CompanyFilterModal from './CompanyFilterModal.js';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const columns = [
    { key: 'code', label: 'Kode' },
    { key: 'nama', label: 'Nama Perusahaan' },
];

function CompanyPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState({ nama: "", code: "" });

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching data with token:', token);

            const params = {
                page,
                limit,
                ...(filter.nama && { nama: filter.nama }),
                ...(filter.code && { code: filter.code }),
            };

            const res = await axios.get(
                `${process.env.REACT_APP_URL_SERVER}/master/companies`,
                {
                    params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(res.data.data || []);
            setTotalPages(res.data.meta?.totalPages || 1);
            setTotalData(res.data.meta?.total || 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [page, limit, filter]);

    const handleCreate = async (form) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_SERVER}/master/companies/create`, form);
            toast.success(response.data.message || 'Data berhasil ditambahkan');
            setShowModal(false);
            fetchData();
        } catch (error) {
            if (error.response?.data) {
                return error.response.data;
            } else {
                toast.error('Gagal menambahkan data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (row) => {
        setEditData(row);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleSubmit = async (form) => {
        setLoading(true);
        try {
            if (isEdit && editData) {
                const url = `${process.env.REACT_APP_URL_SERVER}/master/companies/edit/${editData.id}`;
                await axios.put(url, form);
                toast.success('Data berhasil diubah');
                setShowModal(false);
                setIsEdit(false);
                setEditData(null);
                fetchData();
            } else {
                return await handleCreate(form);
            }
        } catch (error) {
            toast.error('Gagal menyimpan data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Apakah Anda yakin ingin hapus data ini ${row.nama}?`)) {
            setLoading(true);
            try {
                const res = await axios.delete(`${process.env.REACT_APP_URL_SERVER}/master/companies/${row.id}`);
                toast.success(res.data.message || 'Data berhasil dihapus');
                fetchData();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Gagal menghapus data');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                <CreateCompanyModal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setIsEdit(false);
                        setEditData(null);
                    }}
                    onSubmit={handleSubmit}
                    initialData={isEdit ? editData : undefined}
                    title={isEdit ? "Edit Perusahaan" : "Tambah Perusahaan"}
                />
                <CompanyFilterModal
                    key={JSON.stringify(filter)}
                    show={showFilter}
                    onClose={() => setShowFilter(false)}
                    onFilter={(f) => {
                        setFilter(f);
                        setPage(1);
                    }}
                    initialFilter={filter}
                />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="container">
                        <div className="card shadow-sm">
                            <CardHeader
                                onCreate={() => setShowModal(true)} cardTitle="List Perusahaan"
                            />
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-auto">
                                        <button
                                            className="btn btn-warning fw-bold rounded text-white"
                                            onClick={() => setShowFilter(true)}
                                        >
                                            <i className="bi bi-funnel"></i> Filter
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <div
                                            id="activeFilter"
                                            className="ms-2 mb-1 d-flex align-items-center gap-2"
                                        >
                                            {filter.nama && (
                                                <span className="border rounded px-3 py-1 bg-white">
                                                    <span className="text-dark fw-semibold">Perusahaan:</span> {filter.nama}
                                                </span>
                                            )}
                                            {filter.code && (
                                                <span className="border rounded px-3 py-1 bg-white">
                                                    <span className="text-dark fw-semibold">Kode:</span> {filter.code}
                                                </span>
                                            )}
                                            {(filter.nama || filter.code) && (
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    style={{ padding: '2px 10px' }}
                                                    onClick={() => setFilter({ nama: "", code: "" })}
                                                    title="Hapus filter"
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <TableData
                                        columns={columns}
                                        data={data}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        page={page}
                                        limit={limit}
                                    />
                                </div>
                            </div>
                            <Pagination page={page} totalPages={totalPages} totalData={totalData} onPageChange={setPage} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompanyPage;