// src/components/FileUploadModal.jsx

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styles from '../styles/FileUploadModal.module.css';

function FileUploadModal({ onClose }) {
  // 1. 하나의 파일(null) 대신 여러 파일([])을 저장하도록 state를 배열로 변경
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // 2. 새로 추가된 파일들을 기존 파일 목록에 추가
    setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true, // 3. 여러 파일 선택을 허용
    noClick: true, // dropzone을 클릭해도 파일 선택창이 열리지 않도록 설정
  });

  // 4. 목록에서 특정 파일을 제거하는 함수
  const handleRemoveFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    // 5. 여러 파일을 'files'라는 key로 FormData에 추가
    selectedFiles.forEach(file => {
      formData.append('files', file); 
    });

    try {
      const response = await axios.post('/api/v1/report/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert("파일이 성공적으로 업로드되었습니다.");
      console.log(response.data);
      onClose();
    } catch (error) {
      alert("파일 업로드에 실패했습니다.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>데이터 업데이트 및 초기화</h2>
        
        <div className={styles.controls}>
          <div className={styles.fileTabs}>
            <button className={styles.tab1}>파일 첨부</button>
            {/* 6. '내 PC' 버튼 클릭 시 파일 선택창을 열도록 open 함수 연결 */}
            <button className={styles.tab} onClick={open}>내 PC</button>
          </div>
          <button className={styles.resetButton}>초기화하기</button>
        </div>
        <p className={styles.fileInfo}>xls, xlsx 파일만 가능, 최대 10MB</p>
        
        <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.dragActive : ''}`}>
          <input {...getInputProps()} />
          <div className={styles.dropzoneContent}>
            <div className={styles.xlsIcon}>XLS</div>
            <p>드래그해서 가져오기</p>
          </div>
        </div>

        {/* 7. 선택된 파일 목록을 표시 */}
        {selectedFiles.length > 0 && (
          <div className={styles.fileList}>
            {selectedFiles.map(file => (
              <div key={file.name} className={styles.fileItem}>
                <span className={styles.fileName}>{file.name}</span>
                <button 
                  className={styles.removeButton}
                  onClick={() => handleRemoveFile(file.name)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <p className={styles.note}>*파일에는 날짜, 품목, 가격이 포함되어 있어야 합니다.</p>
        
        <div className={styles.actionButtons}>
          <button className={styles.uploadButton} onClick={handleUpload}>등록하기</button>
          <button className={styles.cancelButton} onClick={onClose}>취소하기</button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadModal;