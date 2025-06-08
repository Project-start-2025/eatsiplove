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

CREATE TABLE Foods (
  Id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính tự tăng
  FoodName NVARCHAR(100) NOT NULL,        -- Tên món ăn
  Desciption NVARCHAR(100) NOT NULL,  -- Mô tả món ăn
  Price INT NOT NULL, --Giá món ăn
  IsAvailable BOOLEAN NOT NULL, --Món ăn còn hay hết
  CategoriesId INT NOT NULL,
  ImageId INT NOT NULL,
  
);

CREATE TABLE Restaurants (
  RestaurantId INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính tự tăng
  RestaurantName NVARCHAR(100) NOT NULL,        -- Tên món ăn
  RestaurantAddress NVARCHAR(100) NOT NULL,  -- Mô tả món ăn
  Phone VARCHAR(10) NOT NULL, --Số điện thoại
  CloseTime DATETIME2 DEFAULT GETDATE(),  
);