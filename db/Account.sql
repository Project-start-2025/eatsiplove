CREATE TABLE Accounts (
  AccountId INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính tự tăng
  FullName NVARCHAR(100) NOT NULL,        -- Họ và tên
  Username NVARCHAR(50) NOT NULL UNIQUE,  -- Tên đăng nhập, duy nhất
  PasswordHash NVARCHAR(255) NOT NULL,    -- Mật khẩu (băm)
  Role NVARCHAR(20) NOT NULL DEFAULT 'user', -- Vai trò, mặc định 'user'
  CreatedAt DATETIME DEFAULT GETDATE()    -- Thời gian tạo
);

insert into Accounts(FullName,Username,PasswordHash,Role)
VALUES ('Nguyen Van A','nguyenvana','@VTP123','admin');