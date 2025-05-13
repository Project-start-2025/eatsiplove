   'use client';                    
   import Link from 'next/link';
    import { useEffect, useRef, useState } from 'react';
    import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';

    const Header = () => {
        const [ShowDropDown, setShowDropDown]=useState(false);
        const userRef = useRef<HTMLDivElement>(null);
        useEffect(()=>{
            const handleClickOutSide=(event:MouseEvent)=>{
                if(userRef.current&&!userRef.current.contains(event.target as Node)){
                    setShowDropDown(false);
                }
            };
            document.addEventListener('mousedown'  ,handleClickOutSide);
            return ()=> document.removeEventListener('mousedown',handleClickOutSide);
        },[]);
    return (
        <header style={{ backgroundColor: '#1c1c1c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 30px' }}>
        <nav style={{ display: 'flex', gap: '20px', fontWeight: '600' }}>
            <Link href="/" style={{ color: '#F9C74F' }}>Trang chủ</Link>
            <div style={{ position: 'relative' }}>
            <Link href="/san-pham" style={{ color: 'white' }}>Sản phẩm ▼</Link>   
            </div>
            <Link href="/tin-tuc" style={{ color: 'white' }}>Tin tức</Link>
            <Link href="/lien-he" style={{ color: 'white' }}>Liên hệ</Link>
            <Link href="/gioi-thieu" style={{ color: 'white' }}>Giới thiệu</Link>
        </nav>

        <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <img src="/logo_eatsiplove.png" alt="Honey Bee Farm" style={{ height: 40, cursor: 'pointer' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontWeight: '600' }}>
        <span>
            HOTLINE: <span style={{ color: '#F9C74F' }}>1800 6750</span>
        </span>

        <div ref={userRef} style={{ position: 'relative', cursor: 'pointer' }}>
            <FaUser onClick={() => setShowDropDown(!ShowDropDown)} />
            {ShowDropDown && (
            <div 
                style={{
                position: 'absolute', 
                top: '120%', 
                right: 0, 
                backgroundColor: 'white', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                borderRadius: '6px',
                width: '150px',
                zIndex: 100,
                padding: '10px'
                }}
            >
                <button 
                style={{
                    width: '100%', 
                    background: 'none', 
                    border: 'none', 
                    padding: '8px 0', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#333'
                }}
                onClick={() => alert('Đăng nhập')}
                >
                Đăng nhập
                </button>
                <hr style={{ margin: '8px 0' }} />
                <button 
                style={{
                    width: '100%', 
                    background: 'none', 
                    border: 'none', 
                    padding: '8px 0', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#333'
                }}
                onClick={() => alert('Đăng ký')}
                >
                Đăng ký
                </button>
            </div>
            )}
        </div>

        <FaSearch style={{ cursor: 'pointer' }} />
        <div style={{ position: 'relative', cursor: 'pointer' }}>
            <FaShoppingCart />
            <span
            style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: '#F9C74F',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#1c1c1c',
            }}
            >
            0
            </span>
        </div>
        </div>
        </header>   
    );
    };  

    export default Header;
