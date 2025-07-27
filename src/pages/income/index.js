import React, { useEffect, useState } from 'react';
import { FaFilter, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar/Navbar';
import Pagination from '../../components/pagination/Pagination';
import CardHeader from '../../components/navbar/CardHeaderTitle';
import { Toast } from 'bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import TableData from '../../components/Table';
import { dmyTwoDigitFormat } from '../../helpers/convert/time-convert';
import { useNavigate } from "react-router-dom";


const columns = [
    { key: 'transaction_code', label: 'Kode Transaksi' },
    {
        key: 'tanggal',
        label: 'Tanggal',
        render: (row) => dmyTwoDigitFormat(row.tanggal)
    },
    { key: 'user_name', label: 'Pengaju' },
    { key: 'tipe_name', label: 'Tipe' },
    { key: 'company_code', label: 'Perusahaan' },
    { key: 'divisi_name', label: 'Divisi' },
    { key: 'category_name', label: 'Kategori' },
    { key: 'produk_name', label: 'Produk' },
    { key: 'website_name', label: 'Nama Website' },
    { key: 'nominal_after_admin_fee', label: 'Nominal' },
    {
        key: 'rekening_code', label: 'Rekening', render: (row) => (
            <>
                <div>{row.rekening_code || '-'}</div>
                <div className="text-muted small">{row.rekening_nomor || '-'}</div>
            </>
        )
    },

]

function IncomePage() {
    const [data, setDatate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(10);
    const [filter, setFilter] = useState({ nama: "", code: "" });
    const [showFilter, setShowFilter] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const params = {
                page,
                limit,
                ...(filter.transaction_code && { transaction_code: filter.transaction_code }),
                ...(filter.start_date && { start_date: filter.start_date }),
                ...(filter.end_date && { end_date: filter.start_date }),
            };
            const res = await axios.get(`
                ${process.env.REACT_APP_URL_SERVER}/finance/incomes`,
                {
                    params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDatate(res.data.data || []);
            setTotalPages(res.data.meta?.totalPages || 1);
            setTotalData(res.data.meta?.total || 1);

        } catch (error) {
            toast.error('Gagal memuat data');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page, limit, filter]);

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="mx-5 my-5">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <div class="d-flex justify-content-between align-items-center bg-light rounded">
                                    <h5 className="fw-semibold">List Pemasukkan</h5>
                                    <button
                                        type="button"
                                        className="btn btn-primary fw-semibold"
                                        onClick={() => navigate("/income/create")}
                                    >
                                        <i className="bi bi-plus-lg"></i> Buat Baru
                                    </button>
                                </div>
                            </div>
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
                                        onEdit={''}
                                        onDelete={''}
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

export default IncomePage;

