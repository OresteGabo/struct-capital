import AppKit

// Deterministic exports of supplied screenshots. Never redraw or synthesize app UI.
// Coordinates use original 1408 × 2974 images, measured from the top-left.
let root = FileManager.default.currentDirectoryPath
struct Export {
    let source: String
    let name: String
    let crop: CGRect?
    let width: Int
}
let exports = [
    Export(source: "coupon-calendar", name: "calendar", crop: nil, width: 560),
    Export(source: "coupon-calendar", name: "calendar", crop: nil, width: 840),
    Export(source: "coupon-calendar", name: "calendar-detail", crop: CGRect(x: 110, y: 438, width: 1188, height: 1585), width: 700),
    // Only the annual-report card: excludes account email and issuer logos below.
    Export(source: "documents-and-reports", name: "reports-detail", crop: CGRect(x: 115, y: 1450, width: 1180, height: 520), width: 900),
    // Full existing-document receipt: excludes the account email and later failed import.
    Export(source: "pdf-import", name: "import-detail", crop: CGRect(x: 190, y: 745, width: 990, height: 940), width: 700),
]
for item in exports {
    let input = URL(fileURLWithPath: "\(root)/screenshots/\(item.source).png")
    guard let data = try? Data(contentsOf: input), let bitmap = NSBitmapImageRep(data: data), let cg = bitmap.cgImage else { fatalError("Cannot read \(input.path)") }
    guard cg.width == 1408 && cg.height == 2974 else { fatalError("Source dimensions changed; review privacy crop bounds before exporting") }
    let crop = item.crop ?? CGRect(x: 0, y: 0, width: cg.width, height: cg.height)
    guard let selected = cg.cropping(to: crop) else { fatalError("Invalid crop") }
    let height = Int((Double(item.width) * Double(selected.height) / Double(selected.width)).rounded())
    guard let context = CGContext(data: nil, width: item.width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { fatalError("Cannot create context") }
    context.interpolationQuality = .high
    context.draw(selected, in: CGRect(x: 0, y: 0, width: item.width, height: height))
    guard let output = context.makeImage() else { fatalError("Cannot render image") }
    let out = NSBitmapImageRep(cgImage: output)
    guard let png = out.representation(using: .png, properties: [:]) else { fatalError("Cannot encode PNG") }
    let path = "\(root)/public/product/\(item.name)-\(item.width).png"
    try png.write(to: URL(fileURLWithPath: path))
    print("\(item.name)-\(item.width).png: \(item.width) × \(height)")
}
