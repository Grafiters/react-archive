import React from 'react';
import '../style/section.css';
import '../style/form.css';
import '../style/box.css';

const CheckDpt: React.FC = () => {
  return (
    <div>
        <div className="section">
            <div className='box_container'>
                <div className='box-title'>Check Data Pemilih Pada Pemilu 2024</div>
                <div className='description'>
                    Hasil data penetapan dpt oleh kpu kabupaten/kota, dengan base data berasal dari <a href="https://cekdptonline.kpu.go.id/">check dpt online kpu</a>
                </div>

                <form className='form-input isvalid'>
                    <input type="text" />
                </form>
            </div>
        </div>
    </div>

  );
}

export default CheckDpt;