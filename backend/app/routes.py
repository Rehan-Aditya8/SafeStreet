from flask import Blueprint, render_template, jsonify, current_app
from app.models import DamageReport, Contractor

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def landing():
    # Ensure index.html exists in templates
    return render_template("index.html")


@main_bp.route("/api/landing-stats")
def landing_stats():
    """Public endpoint — no auth required. Returns counts for the landing page."""
    try:
        total_reports = DamageReport.query.count()
        fixed = DamageReport.query.filter_by(status='resolved').count()
        active = total_reports - fixed
        contractors = Contractor.query.count()
    except Exception:
        total_reports, fixed, active, contractors = 0, 0, 0, 0

    return jsonify({
        "total_reports": total_reports,
        "fixed": fixed,
        "active_reports": active,
        "contractors": contractors
    }), 200
