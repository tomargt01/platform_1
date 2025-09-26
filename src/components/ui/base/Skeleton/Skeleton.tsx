import React from "react";
import styles, { baseColor } from "./Skeleton.styles";
import { SkeletonProps } from "./Skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
    type = "text",
    theme = "light",
    size = "medium",
    color,
    width,
    height,
    className = "",
    style,
    ...rest
}) => {
    const themeColor = color || baseColor[theme];
    const sharedStyle: React.CSSProperties = {
        backgroundColor: themeColor,
        borderRadius: 4,
        ...style,
    };

    // Type-based renderers
    switch (type) {
        case "table":
            // Table skeleton: rows + cols (10x4 example)
            return (
                <div className={`${styles.skeleton} ${styles.table} ${styles[size]} ${styles[theme]} ${className}`}>
                    {[...Array(4)].map((_, row) => (
                        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }} key={row}>
                            {[...Array(10)].map((_, col) => (
                                <div
                                    key={col}
                                    style={{
                                        ...sharedStyle,
                                        width: 60,
                                        height: 18,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            );
        case "card":
            // Card skeleton: rectangle with image and lines
            return (
                <div className={`${styles.skeleton} ${styles.card} ${styles[size]} ${styles[theme]} ${className}`} style={{ ...sharedStyle, width: 220, height: 120, padding: 16 }}>
                    <div
                        style={{
                            ...sharedStyle,
                            width: 48,
                            height: 48,
                            borderRadius: "8px",
                            marginBottom: 12,
                        }}
                    />
                    <div
                        style={{
                            ...sharedStyle,
                            width: "80%",
                            height: 14,
                            marginBottom: 6,
                        }}
                    />
                    <div
                        style={{
                            ...sharedStyle,
                            width: "60%",
                            height: 14,
                        }}
                    />
                </div>
            );
        case "button":
            // Button skeleton: rounded rectangle
            return (
                <div
                    className={`${styles.skeleton} ${styles.button} ${styles[size]} ${styles[theme]} ${className}`}
                    style={{
                        ...sharedStyle,
                        borderRadius: 24,
                        width: width || 110,
                        height: height || 32,
                    }}
                    {...rest}
                />
            );
        case "avatar":
            // Avatar skeleton: circle
            return (
                <div
                    className={`${styles.skeleton} ${styles.avatar} ${styles[size]} ${styles[theme]} ${className}`}
                    style={{
                        ...sharedStyle,
                        width: width || 48,
                        height: height || 48,
                        borderRadius: "50%",
                    }}
                    {...rest}
                />
            );
        case "text":
            // Text skeleton: lines of varying width
            return (
                <div className={`${styles.skeleton} ${styles.text} ${styles[size]} ${styles[theme]} ${className}`}>
                    <div style={{ ...sharedStyle, width: "80%", height: 12, marginBottom: 4 }} />
                    <div style={{ ...sharedStyle, width: "65%", height: 12, marginBottom: 4 }} />
                    <div style={{ ...sharedStyle, width: "90%", height: 12, marginBottom: 4 }} />
                </div>
            );
        case "header":
            // Header skeleton: big bar + icon spot
            return (
                <div className={`${styles.skeleton} ${styles.header} ${styles[size]} ${styles[theme]} ${className}`} style={{ display: "flex", alignItems: "center", gap: 16, ...sharedStyle }}>
                    <div style={{ ...sharedStyle, width: 36, height: 36, borderRadius: "50%" }} />
                    <div style={{ ...sharedStyle, width: "70%", height: 20 }} />
                </div>
            );
        case "sidebar":
            // Sidebar: vertical stack
            return (
                <div className={`${styles.skeleton} ${styles.sidebar} ${styles[size]} ${styles[theme]} ${className}`} style={sharedStyle}>
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} style={{ ...sharedStyle, width: "90%", height: 18, margin: "6px 0" }} />
                    ))}
                </div>
            );
        case "banner":
            // Banner skeleton: wide rectangle
            return (
                <div
                    className={`${styles.skeleton} ${styles.banner} ${styles[size]} ${styles[theme]} ${className}`}
                    style={{
                        ...sharedStyle,
                        width: width || "95%",
                        height: height || 60,
                        borderRadius: 8,
                        marginBottom: 6
                    }}
                    {...rest}
                />
            );
        // Add similar switch cases for image, chart, profile, grid, tabs, timeline, list etc.
        default:
            // Generic rectangle for all others (fallback)
            return (
                <div
                    className={[styles.skeleton, styles[type], styles[size], styles[theme], className].join(" ")}
                    style={{
                        ...sharedStyle,
                        width: width || 120,
                        height: height || 18,
                    }}
                    {...rest}
                />
            );
    }
};

export default Skeleton;
