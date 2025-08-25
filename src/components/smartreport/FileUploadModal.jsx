// src/components/FileUploadModal.jsx

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styles from '../../styles/FileUploadModal.module.css';
import useUuidStore from '../../store/useUuidStore';

function FileUploadModal({ onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const storeUuid = useUuidStore((state) => state.storeUuid);

  // 1. onDrop 콜백 수정: 새 파일로 항상 교체하도록 변경
  const onDrop = useCallback((acceptedFiles) => {
    // acceptedFiles 배열의 첫 번째 파일만 사용하고, 전체 배열을 교체합니다.
    setSelectedFiles(acceptedFiles.slice(0, 1));
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    // 2. multiple 옵션을 false로 변경
    multiple: false,
    noClick: true,
  });

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const incrementDataVersion = useUuidStore((state) => state.incrementDataVersion);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }
    if (!storeUuid) {
      alert("가게 정보(UUID)를 찾을 수 없습니다.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    // selectedFiles 배열에 파일이 하나만 있으므로 첫 번째 파일을 사용합니다.
    formData.append('file', selectedFiles[0]);
    formData.append('storeUuid', storeUuid);

    try {
      const response = await axios.post('http://13.209.239.240/api/v1/report/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert("파일이 성공적으로 업로드되었습니다.");
      console.log('Upload Success:', response.data);
      incrementDataVersion();
      onClose();
    } catch (error) {
      alert("파일 업로드에 실패했습니다. 파일명을 확인해주세요.");
      console.error("Upload error:", error.response ? error.response.data : error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>데이터 업데이트</h2>
        
        <div className={styles.controls}>
          <div className={styles.fileTabs}>
            <p className={styles.tab1}>파일 첨부</p>
            <button className={styles.tab} onClick={open}>내 PC</button>
          </div>
        </div>
        <p className={styles.fileInfo}>xls, xlsx 파일만 가능, 최대 10MB</p>
        
        <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.dragActive : ''}`}>
          <input {...getInputProps()} />
          <div className={styles.dropzoneContent}>
            <div className={styles.xlsIcon}>XLS</div>
            <p>드래그해서 가져오기</p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className={styles.fileList}>
            {selectedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className={styles.fileItem}>
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

        <p className={styles.note}>* 파일명은 "YYYYMMDD" 형식의 유효한 날짜를 포함해야 합니다.</p>
        
        <div className={styles.actionButtons}>
          <button className={styles.uploadButton} onClick={handleUpload} disabled={isUploading}>
            {isUploading ? '등록 중...' : '등록하기'}
          </button>
          <button className={styles.cancelButton} onClick={onClose} disabled={isUploading}>
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadModal;