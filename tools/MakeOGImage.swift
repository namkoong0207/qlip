import AppKit
import CoreGraphics
import Foundation

// The card that shows up when someone pastes a qlip.kr link into a chat.
//
// Which is most of what a launch link *is* — the page itself only gets seen if
// this makes someone tap. So it carries the two things worth knowing before the
// tap: the name, and what the thing does.

let w = 1200.0, h = 630.0

guard let ctx = CGContext(
    data: nil, width: Int(w), height: Int(h), bitsPerComponent: 8, bytesPerRow: 0,
    space: CGColorSpace(name: CGColorSpace.sRGB)!,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else { fatalError() }

func rgb(_ hex: Int, _ a: Double = 1) -> CGColor {
    CGColor(srgbRed: Double((hex >> 16) & 0xFF) / 255, green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255, alpha: a)
}
func grad(_ c: [CGColor], _ l: [CGFloat]) -> CGGradient {
    CGGradient(colorsSpace: CGColorSpace(name: CGColorSpace.sRGB)!, colors: c as CFArray, locations: l)!
}

// Ground: the app's own dark, not a stock gradient.
ctx.setFillColor(rgb(0x0E1017))
ctx.fill(CGRect(x: 0, y: 0, width: w, height: h))

// A wash of the brand hues bleeding in from the right, where the mark sits.
ctx.saveGState()
ctx.drawRadialGradient(
    grad([rgb(0x6C7BFF, 0.30), rgb(0x6C7BFF, 0)], [0, 1]),
    startCenter: CGPoint(x: w - 200, y: h - 120), startRadius: 0,
    endCenter: CGPoint(x: w - 200, y: h - 120), endRadius: 560, options: []
)
ctx.drawRadialGradient(
    grad([rgb(0xA36BFF, 0.22), rgb(0xA36BFF, 0)], [0, 1]),
    startCenter: CGPoint(x: w - 120, y: 150), startRadius: 0,
    endCenter: CGPoint(x: w - 120, y: 150), endRadius: 460, options: []
)
ctx.restoreGState()

// MARK: The Q

let center = CGPoint(x: w - 268, y: h / 2)
let ring = CGMutablePath()
ring.addArc(center: center, radius: 132, startAngle: 0, endAngle: .pi * 2, clockwise: false)
let tail = CGMutablePath()
tail.move(to: CGPoint(x: center.x + 85, y: center.y - 85))
tail.addLine(to: CGPoint(x: center.x + 137, y: center.y - 137))

ctx.saveGState()
let mark = CGMutablePath()
mark.addPath(ring.copy(strokingWithWidth: 42, lineCap: .round, lineJoin: .round, miterLimit: 10))
mark.addPath(tail.copy(strokingWithWidth: 42, lineCap: .round, lineJoin: .round, miterLimit: 10))
ctx.addPath(mark)
ctx.clip()
ctx.drawLinearGradient(
    grad([rgb(0x2E9BFF), rgb(0x6C7BFF), rgb(0xA36BFF)], [0, 0.5, 1]),
    start: CGPoint(x: center.x - 150, y: center.y + 150),
    end: CGPoint(x: center.x + 150, y: center.y - 150), options: []
)
ctx.restoreGState()

// Two lines of text inside, as in the app's own icon.
for (i, wid) in [116.0, 78.0].enumerated() {
    let bar = CGRect(x: center.x - wid / 2, y: center.y + 6 - Double(i) * 38, width: wid, height: 22)
    ctx.addPath(CGPath(roundedRect: bar, cornerWidth: 11, cornerHeight: 11, transform: nil))
    ctx.setFillColor(rgb(0xDCE4F5, i == 0 ? 0.9 : 0.55))
    ctx.fillPath()
}

// MARK: Type

func draw(_ text: String, x: Double, y: Double, size: Double, weight: NSFont.Weight, color: CGColor, tracking: Double = 0) {
    let font = NSFont.systemFont(ofSize: size, weight: weight)
    let attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: NSColor(cgColor: color)!,
        .kern: tracking,
    ]
    let line = NSAttributedString(string: text, attributes: attributes)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: false)
    line.draw(at: NSPoint(x: x, y: y))
    NSGraphicsContext.restoreGraphicsState()
}

let left = 88.0
draw("QLIP", x: left, y: h - 132, size: 30, weight: .heavy, color: rgb(0xFFFFFF), tracking: 6)
draw("사진 한 장이면,", x: left, y: h - 250, size: 62, weight: .bold, color: rgb(0xFFFFFF))
draw("이해될 때까지 풀어드려요.", x: left, y: h - 336, size: 62, weight: .bold, color: rgb(0x9BB4FF))
draw("대학 이공계 문제 풀이 · AI가 푼 답을 AI가 다시 검증해요",
     x: left, y: 176, size: 25, weight: .regular, color: rgb(0x9AA3B4))

// A pill that says where to get it, because that is the next action.
let pill = CGRect(x: left, y: 92, width: 268, height: 54)
ctx.addPath(CGPath(roundedRect: pill, cornerWidth: 27, cornerHeight: 27, transform: nil))
ctx.setFillColor(rgb(0xFFFFFF, 0.10))
ctx.fillPath()
ctx.addPath(CGPath(roundedRect: pill, cornerWidth: 27, cornerHeight: 27, transform: nil))
ctx.setStrokeColor(rgb(0xFFFFFF, 0.18))
ctx.setLineWidth(1)
ctx.strokePath()
draw("App Store에서 받기", x: left + 34, y: 108, size: 23, weight: .semibold, color: rgb(0xE9EDF7))

guard let image = ctx.makeImage() else { fatalError() }
let rep = NSBitmapImageRep(cgImage: image)
rep.size = NSSize(width: w, height: h)
try! rep.representation(using: .png, properties: [:])!
    .write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
print("wrote")
