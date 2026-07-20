"use client";

import { useState, useEffect } from "react";
import CldImg from "@/components/shared/CldImg";

// ─── Custom Confirmation Modal ───────────────────────────
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, deleting }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-0 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        {/* Icon */}
        <div className="flex justify-center pt-8 pb-3">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 text-center px-6">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-500 text-center mt-2 px-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 p-6 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors cursor-pointer ${
              deleting
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {deleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, type: "", itemId: null });
  const itemsPerPage = 5;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fetchEvaluations = async () => {
    try {
      const res = await fetch("/api/chatbot/feedback");
      const data = await res.json();
      setEvaluations(data.evaluations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, [refreshTrigger]);

  // ─── Modal Handlers ──────────────────────────────────────
  const openDeleteModal = (id) => {
    setModal({ isOpen: true, type: "single", itemId: id });
  };

  const openDeleteAllModal = () => {
    setModal({ isOpen: true, type: "all", itemId: null });
  };

  const [deleting, setDeleting] = useState(false);

  const closeModal = () => {
    setModal({ isOpen: false, type: "", itemId: null });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      if (modal.type === "single") {
        const res = await fetch(`/api/chatbot/feedback?id=${modal.itemId}`, {
          method: "DELETE",
        });
        if (res.ok) setRefreshTrigger((prev) => prev + 1);
      } else if (modal.type === "all") {
        const res = await fetch("/api/chatbot/feedback?all=true", {
          method: "DELETE",
        });
        if (res.ok) setRefreshTrigger((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      closeModal();
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Only show suggestions in the table (no emoji ratings)
  const suggestionsOnly = evaluations.filter(
    (e) => e.type === "negative_suggestion"
  );

  // Clamp currentPage when data changes (e.g. after delete)
  useEffect(() => {
    const newTotal = Math.ceil(suggestionsOnly.length / itemsPerPage);
    if (currentPage > newTotal && newTotal > 0) {
      setCurrentPage(newTotal);
    }
  }, [suggestionsOnly.length]);

  // Pagination
  const totalPages = Math.ceil(suggestionsOnly.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = suggestionsOnly.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004282]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <CldImg src="/icons/about.svg" alt="" className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                Evaluasi User
              </h1>
              <p className="text-gray-500 text-xs lg:text-sm mt-0.5">
                Feedback dan saran dari pengguna chatbot SCS Pintar
              </p>
            </div>
          </div>
        </div>
        {evaluations.length > 0 && (
          <button
            onClick={openDeleteAllModal}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Hapus Semua
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-gray-800">
            {evaluations.filter((e) => ["❤️", "👍", "👎"].includes(e.detail)).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-green-600">
            {evaluations.filter((e) => ["❤️", "👍"].includes(e.detail)).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Puas (❤️/👍)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-red-600">
            {evaluations.filter((e) => ["👎"].includes(e.detail)).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Tidak Puas (👎)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-orange-600">
            {evaluations.filter((e) => e.type === "negative_suggestion").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Saran Tertulis</p>
        </div>
      </div>

      {/* Desktop Table */}
      {!isMobile && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Tipe
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Detail
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    IP Address
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Waktu
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Belum ada evaluasi dari pengguna.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600">
                          Saran
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-700 max-w-[250px] truncate whitespace-pre-line">
                        {item.detail}
                      </td>
                      <td className="p-4 text-sm text-gray-500 font-mono text-xs">
                        {item.ip || "-"}
                      </td>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => openDeleteModal(item.id)}
                          className="text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      {isMobile && (
        <div className="space-y-3">
          {currentItems.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
              Belum ada evaluasi dari pengguna.
            </div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-600">
                        Saran
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {item.ip || "-"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg leading-relaxed whitespace-pre-line">
                    {item.detail}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(item.createdAt)}</span>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className="text-red-500 hover:text-red-600 font-semibold cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              currentPage === 1
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-[#004282] text-white hover:bg-blue-800 cursor-pointer"
            }`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              currentPage === 1
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-[#004282] text-white hover:bg-blue-800 cursor-pointer"
            }`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </button>
          {(() => {
            const pages = [];
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, start + 2);
            if (end - start < 2) { start = Math.max(1, end - 2); }
            for (let i = start; i <= end; i++) pages.push(i);
            return pages;
          })().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-yellow-400 text-neutral-900"
                  : "bg-neutral-200 text-stone-800 hover:bg-neutral-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-[#004282] text-white hover:bg-blue-800 cursor-pointer"
            }`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-[#004282] text-white hover:bg-blue-800 cursor-pointer"
            }`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
            </svg>
          </button>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-blue-800 mb-1">
          Tentang Evaluasi User
        </h3>
        <p className="text-xs text-blue-600 leading-relaxed">
          Halaman ini menampilkan feedback dari pengguna chatbot SCS Pintar.
          Feedback positif (❤️/👍) dan negatif (👎) beserta saran tertulis yang masuk dari pengguna.
          Gunakan fitur hapus untuk membersihkan data yang sudah dievaluasi.
        </p>
      </div>

      {/* ─── Confirmation Modal ─── */}
      <ConfirmModal
        isOpen={modal.isOpen}
        title={modal.type === "all" ? "Hapus Semua Data?" : "Hapus Evaluasi Ini?"}
        message={
          modal.type === "all"
            ? "Semua data evaluasi akan dihapus permanen. Tindakan ini tidak bisa dibatalkan."
            : "Data evaluasi ini akan dihapus permanen dari database. Tindakan ini tidak bisa dibatalkan."
        }
        onConfirm={confirmDelete}
        onCancel={closeModal}
        deleting={deleting}
      />
    </div>
  );
}
