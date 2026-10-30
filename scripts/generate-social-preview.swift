import AppKit
// Run from the repository root on macOS; uses the unchanged official mobile icon.
let root = FileManager.default.currentDirectoryPath
let image = NSImage(size: NSSize(width: 1200, height: 630))
image.lockFocus()
NSColor(red: 250/255, green: 248/255, blue: 242/255, alpha: 1).setFill()
NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
let olive = NSColor(red: 109/255, green: 94/255, blue: 15/255, alpha: 1)
let ink = NSColor(red: 37/255, green: 35/255, blue: 23/255, alpha: 1)
if let mark = NSImage(contentsOfFile: "\(root)/scripts/assets/struct-capital-icon-light-192.png") {
    mark.draw(in: NSRect(x: 64, y: 440, width: 90, height: 90))
}
("Struct Capital" as NSString).draw(at: NSPoint(x: 174, y: 465), withAttributes: [.font: NSFont.systemFont(ofSize: 34, weight: .semibold), .foregroundColor: ink])
("A clearer view of your\ninvestments, across brokers." as NSString).draw(in: NSRect(x: 76, y: 165, width: 1060, height: 240), withAttributes: [.font: NSFont.systemFont(ofSize: 64, weight: .bold), .foregroundColor: ink])
("Independent portfolio management software" as NSString).draw(at: NSPoint(x: 80, y: 110), withAttributes: [.font: NSFont.systemFont(ofSize: 26), .foregroundColor: olive])
olive.setFill()
NSRect(x: 80, y: 64, width: 1040, height: 3).fill()
image.unlockFocus()
guard let tiff = image.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Cannot encode social image") }
try png.write(to: URL(fileURLWithPath: "\(root)/public/brand/social-preview.png"))
