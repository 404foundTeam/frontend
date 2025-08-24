// src/components/FileUploadModal.jsx

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styles from '../../styles/FileUploadModal.module.css';
import useUuidStore from '../../store/useUuidStore'; 

function FileUploadModal({ onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false); //  2. 업로드 로딩 상태 추가
  const storeUuid = useUuidStore((state) => state.storeUuid); //  3. 스토어에서 UUID 가져오기

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
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
    //  4. storeUuid가 없는 경우 처리
    if (!storeUuid) {
      alert("가게 정보(UUID)를 찾을 수 없습니다.");
      return;
    }

    setIsUploading(true); // 로딩 시작

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('file', file); // 백엔드 key가 'file'이므로 'files'에서 'file'로 변경
    });
    
    //  5. FormData에 storeUuid 추가
    formData.append('storeUuid', storeUuid);

    try {
      //  6. axios로 실제 API 호출
      const response = await axios.post('http://13.209.239.240/api/v1/report/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert("파일이 성공적으로 업로드되었습니다.");
      console.log('Upload Success:', response.data);
      incrementDataVersion();
      onClose(); // 성공 시 모달 닫기
    } catch (error) {
      alert("파일 업로드에 실패했습니다. 파일명을 확인해주세요.");
      console.error("Upload error:", error.response ? error.response.data : error.message);
    } finally {
      setIsUploading(false); // 로딩 종료
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
          {/*  7. 업로드 중일 때 버튼 비활성화 및 텍스트 변경 */}
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