# Data Strategy

## Chọn hướng nào

Hướng phù hợp cho sản phẩm này là:

1. Dùng **bộ dữ liệu mở** làm nguồn chuẩn cho từ vựng, Kanji, ví dụ câu.
2. Đồng bộ dữ liệu đó vào **database của chính hệ thống**.
3. Dùng **giáo trình Minna no Nihongo** chỉ để gắn `lesson/unit mapping`, không sao chép nguyên văn nội dung thương mại.

## Nguồn nên dùng

### 1. Từ vựng và nghĩa

- **JMdict / JMdict-EDICT**
- Vai trò:
  - chuẩn hóa mục từ
  - nhiều cách đọc
  - nghĩa tiếng Anh làm lớp semantic base
- Cách dùng trong hệ thống:
  - import vào bảng vocabulary mở rộng
  - giữ `meaning_en` chuẩn
  - biên tập thêm `meaning_vi` nội bộ cho UI học N5

### 2. Kanji metadata

- **KANJIDIC2**
- Vai trò:
  - onyomi / kunyomi
  - nghĩa cơ bản
  - cấp JLPT, radical, stroke count
- Cách dùng:
  - enrich bảng `kanji`
  - đồng bộ metadata cho quiz, filter và detail screen

### 3. Stroke order

- **KanjiVG**
- Vai trò:
  - dữ liệu vector cho thứ tự nét
- Cách dùng:
  - build script chuyển SVG/path thành format nội bộ
  - lưu bản rút gọn để frontend render animation

### 4. Ví dụ câu

- **Tatoeba**
- Vai trò:
  - ví dụ câu Nhật ngữ đời thường
  - có thể lọc theo từ khóa N5
- Cách dùng:
  - lấy câu ngắn, dễ hiểu
  - ưu tiên câu có bản dịch tiếng Anh sẵn
  - biên tập / thêm tiếng Việt nội bộ nếu cần

## Nguồn không nên phụ thuộc runtime

### Jisho.org API

- Có ích để tham khảo nhanh khi phát triển.
- Không nên dùng làm production dependency chính.
- Lý do:
  - không phải nguồn dữ liệu hệ thống tự kiểm soát
  - khó đảm bảo SLA / ổn định / giới hạn truy cập dài hạn

### Mazii API

- Không nên chọn làm nguồn cốt lõi.
- Lý do:
  - khó kiểm soát tính mở, license và sự ổn định lâu dài
  - dễ khóa theo sản phẩm bên thứ ba

### KanjiAlive API

- Có thể tham khảo cấu trúc dữ liệu.
- Không nên là nguồn duy nhất của pipeline vì coverage và khả năng tích hợp nội bộ bị giới hạn hơn bộ dữ liệu thô mở.

## Vai trò của Minna no Nihongo

Nên dùng theo cách:

- map `lesson 1..25`
- nhóm từ vựng theo lesson
- nhóm mẫu ngữ pháp theo lesson
- kiểm tra tính phù hợp trình độ N5

Không nên:

- scrape nội dung sách
- chép nguyên văn hội thoại / bài tập / lời giải

## Roadmap thực thi

### Giai đoạn 1

- thêm script import thô cho:
  - JMdict
  - KANJIDIC2
  - KanjiVG
- tạo bảng staging hoặc file normalize JSON

### Giai đoạn 2

- map dữ liệu mở vào schema hiện tại
- bổ sung trường:
  - external_id
  - jlpt_level
  - tags
  - source
  - source_url

### Giai đoạn 3

- curate bộ N5 thật gọn:
  - khoảng 25 lesson
  - 500-800 từ
  - 100-150 Kanji
  - 1-3 ví dụ / mục từ

## Kết luận

Phương án đúng là:

- **Dataset mở làm nền**
- **DB nội bộ làm source of truth**
- **Minna no Nihongo làm lesson mapping**
- **không phụ thuộc API từ điển bên ngoài ở runtime production**
