!(function (e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? t(require('tweakpane'), require('dat.gui'))
		: 'function' == typeof define && define.amd
		? define(['tweakpane', 'dat.gui'], t)
		: t(
				(e = 'undefined' != typeof globalThis ? globalThis : e || self)
					.Tweakpane,
				e.dat,
		  );
})(this, function (e, t) {
	'use strict';
	function n(e) {
		if (e && e.__esModule) return e;
		var t = Object.create(null);
		return (
			e &&
				Object.keys(e).forEach(function (n) {
					if ('default' !== n) {
						var o = Object.getOwnPropertyDescriptor(e, n);
						Object.defineProperty(
							t,
							n,
							o.get
								? o
								: {
										enumerable: !0,
										get: function () {
											return e[n];
										},
								  },
						);
					}
				}),
			(t.default = e),
			Object.freeze(t)
		);
	}
	var o = n(t);
	function a(e, t = !1) {
		const n = `*[data-pane-${e + (t ? 'console' : '')}]`,
			o = document.querySelector(n);
		if (!o) throw Error(`container not found: ${n}`);
		return o;
	}
	function r(e) {
		const t = 0.02 * e;
		return (
			(12 / Math.PI) *
			(Math.sin(1 * t * Math.PI) +
				Math.sin(3 * t * Math.PI) / 3 +
				Math.sin(5 * t * Math.PI) / 5) *
			0.25
		);
	}
	function l() {
		var t;
		(t = {
			text(t) {
				new e.Pane({container: t}).addBlade({
					view: 'text',
					label: 'name',
					parse: (e) => String(e),
					value: 'sketch-01',
				});
			},
			list(t) {
				const n = new e.Pane({container: a('list', !0)});
				n.addBlade({
					view: 'text',
					label: 'value',
					parse: (e) => String(e),
					value: 'LDG',
				}),
					new e.Pane({container: t})
						.addBlade({
							view: 'list',
							label: 'scene',
							options: [
								{text: 'loading', value: 'LDG'},
								{text: 'menu', value: 'MNU'},
								{text: 'field', value: 'FLD'},
							],
							value: 'LDG',
						})
						.on('change', (e) => {
							(n.children[0].value = e.value), n.refresh();
						});
			},
			slider(t) {
				new e.Pane({container: t}).addBlade({
					view: 'slider',
					label: 'brightness',
					min: 0,
					max: 1,
					value: 0.5,
				});
			},
		}),
			Object.keys(t).forEach((e) => {
				(0, t[e])(a(e));
			});
	}
	class i {
		constructor(e) {
			this.controller_ = e;
		}
		get element() {
			return this.controller_.view.element;
		}
		get disabled() {
			return this.controller_.viewProps.get('disabled');
		}
		set disabled(e) {
			this.controller_.viewProps.set('disabled', e);
		}
		get hidden() {
			return this.controller_.viewProps.get('hidden');
		}
		set hidden(e) {
			this.controller_.viewProps.set('hidden', e);
		}
		dispose() {
			this.controller_.viewProps.set('disposed', !0);
		}
	}
	function s(e, t) {
		if (e.length !== t.length) return !1;
		for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	class d {
		constructor() {
			this.observers_ = {};
		}
		on(e, t) {
			let n = this.observers_[e];
			return n || (n = this.observers_[e] = []), n.push({handler: t}), this;
		}
		off(e, t) {
			const n = this.observers_[e];
			return n && (this.observers_[e] = n.filter((e) => e.handler !== t)), this;
		}
		emit(e, t) {
			const n = this.observers_[e];
			n &&
				n.forEach((e) => {
					e.handler(t);
				});
		}
	}
	const c = 'tp';
	function u(e) {
		return (t, n) =>
			[c, '-', e, 'v', t ? `_${t}` : '', n ? `-${n}` : ''].join('');
	}
	function h(e) {
		return e.rawValue;
	}
	function p(e, t) {
		var n, o;
		e.emitter.on('change', ((n = h), (o = t), (e) => o(n(e)))), t(e.rawValue);
	}
	class b {
		constructor(e, t) {
			var n;
			(this.constraint_ = null == t ? void 0 : t.constraint),
				(this.equals_ =
					null !== (n = null == t ? void 0 : t.equals) && void 0 !== n
						? n
						: (e, t) => e === t),
				(this.emitter = new d()),
				(this.rawValue_ = e);
		}
		get constraint() {
			return this.constraint_;
		}
		get rawValue() {
			return this.rawValue_;
		}
		set rawValue(e) {
			this.setRawValue(e, {
				forceEmit: !1,
				beforeChange: !1,
				emit: !0,
				last: !0,
			});
		}
		setRawValue(e, t) {
			const n =
					null != t ? t : {forceEmit: !1, beforeChange: !1, emit: !0, last: !0},
				o = this.constraint_ ? this.constraint_.constrain(e) : e,
				a = this.rawValue_;
			(!this.equals_(a, o) || n.forceEmit) &&
				(this.emitter.emit('beforechange', {sender: this}),
				(this.rawValue_ = o),
				this.emitter.emit('change', {
					options: n,
					previousRawValue: a,
					rawValue: o,
					sender: this,
				}));
		}
	}
	class g {
		constructor(e) {
			(this.emitter = new d()), (this.value_ = e);
		}
		get rawValue() {
			return this.value_;
		}
		set rawValue(e) {
			this.setRawValue(e, {
				forceEmit: !1,
				beforeChange: !1,
				last: !0,
				emit: !0,
			});
		}
		setRawValue(e, t) {
			const n =
					null != t ? t : {forceEmit: !1, beforeChange: !1, last: !0, emit: !0},
				o = this.value_;
			(o !== e || n.forceEmit) &&
				(this.emitter.emit('beforechange', {sender: this}),
				(this.value_ = e),
				this.emitter.emit('change', {
					options: n,
					previousRawValue: o,
					rawValue: this.value_,
					sender: this,
				}));
		}
	}
	function m(e, t) {
		const n = null == t ? void 0 : t.constraint,
			o = null == t ? void 0 : t.equals;
		return n || o ? new b(e, t) : new g(e);
	}
	class f {
		constructor(e) {
			(this.emitter = new d()), (this.valMap_ = e);
			for (const e in this.valMap_) {
				this.valMap_[e].emitter.on('change', () => {
					this.emitter.emit('change', {key: e, sender: this});
				});
			}
		}
		static createCore(e) {
			return Object.keys(e).reduce(
				(t, n) => Object.assign(t, {[n]: m(e[n])}),
				{},
			);
		}
		static fromObject(e) {
			const t = this.createCore(e);
			return new f(t);
		}
		get(e) {
			return this.valMap_[e].rawValue;
		}
		set(e, t) {
			this.valMap_[e].rawValue = t;
		}
		value(e) {
			return this.valMap_[e];
		}
	}
	function v(e) {
		return (t) => (n) => {
			if (!t && void 0 === n) return {succeeded: !1, value: void 0};
			if (t && void 0 === n) return {succeeded: !0, value: void 0};
			const o = e(n);
			return void 0 !== o
				? {succeeded: !0, value: o}
				: {succeeded: !1, value: void 0};
		};
	}
	function w(e) {
		return {
			custom: (t) => v(t)(e),
			boolean: v((e) => ('boolean' == typeof e ? e : void 0))(e),
			number: v((e) => ('number' == typeof e ? e : void 0))(e),
			string: v((e) => ('string' == typeof e ? e : void 0))(e),
			function: v((e) => ('function' == typeof e ? e : void 0))(e),
			constant: (t) => v((e) => (e === t ? t : void 0))(e),
			raw: v((e) => e)(e),
			object: (t) =>
				v((e) => {
					var n;
					if (null !== (n = e) && 'object' == typeof n)
						return (function (e, t) {
							return Object.keys(t).reduce((n, o) => {
								if (void 0 === n) return;
								const a = (0, t[o])(e[o]);
								return a.succeeded
									? Object.assign(Object.assign({}, n), {[o]: a.value})
									: void 0;
							}, {});
						})(e, t);
				})(e),
			array: (t) =>
				v((e) => {
					var n;
					if (Array.isArray(e))
						return (
							(n = t),
							e.reduce((e, t) => {
								if (void 0 === e) return;
								const o = n(t);
								return o.succeeded && void 0 !== o.value
									? [...e, o.value]
									: void 0;
							}, [])
						);
				})(e),
		};
	}
	const x = {optional: w(!0), required: w(!1)};
	class k {
		constructor(e) {
			this.value_ = e;
		}
		static create(e) {
			return [
				new k(e),
				(t, n) => {
					e.setRawValue(t, n);
				},
			];
		}
		get emitter() {
			return this.value_.emitter;
		}
		get rawValue() {
			return this.value_.rawValue;
		}
	}
	const I = u('');
	function P(e, t) {
		return (function (e, t) {
			return (n) => {
				!(function (e, t, n) {
					n ? e.classList.add(t) : e.classList.remove(t);
				})(e, t, n);
			};
		})(e, I(void 0, t));
	}
	class _ extends f {
		constructor(e) {
			var t;
			super(e),
				(this.onDisabledChange_ = this.onDisabledChange_.bind(this)),
				(this.onParentChange_ = this.onParentChange_.bind(this)),
				(this.onParentGlobalDisabledChange_ =
					this.onParentGlobalDisabledChange_.bind(this)),
				([this.globalDisabled_, this.setGlobalDisabled_] = k.create(
					m(this.getGlobalDisabled_()),
				)),
				this.value('disabled').emitter.on('change', this.onDisabledChange_),
				this.value('parent').emitter.on('change', this.onParentChange_),
				null === (t = this.get('parent')) ||
					void 0 === t ||
					t.globalDisabled.emitter.on(
						'change',
						this.onParentGlobalDisabledChange_,
					);
		}
		static create(e) {
			var t, n, o;
			const a = null != e ? e : {};
			return new _(
				f.createCore({
					disabled: null !== (t = a.disabled) && void 0 !== t && t,
					disposed: !1,
					hidden: null !== (n = a.hidden) && void 0 !== n && n,
					parent: null !== (o = a.parent) && void 0 !== o ? o : null,
				}),
			);
		}
		get globalDisabled() {
			return this.globalDisabled_;
		}
		bindClassModifiers(e) {
			var t, n, o;
			p(this.globalDisabled_, P(e, 'disabled')),
				(t = this),
				(n = 'hidden'),
				(o = P(e, 'hidden')),
				p(t.value(n), o);
		}
		bindDisabled(e) {
			p(this.globalDisabled_, (t) => {
				e.disabled = t;
			});
		}
		bindTabIndex(e) {
			p(this.globalDisabled_, (t) => {
				e.tabIndex = t ? -1 : 0;
			});
		}
		handleDispose(e) {
			this.value('disposed').emitter.on('change', (t) => {
				t && e();
			});
		}
		getGlobalDisabled_() {
			const e = this.get('parent');
			return (!!e && e.globalDisabled.rawValue) || this.get('disabled');
		}
		updateGlobalDisabled_() {
			this.setGlobalDisabled_(this.getGlobalDisabled_());
		}
		onDisabledChange_() {
			this.updateGlobalDisabled_();
		}
		onParentGlobalDisabledChange_() {
			this.updateGlobalDisabled_();
		}
		onParentChange_(e) {
			var t;
			const n = e.previousRawValue;
			null == n ||
				n.globalDisabled.emitter.off(
					'change',
					this.onParentGlobalDisabledChange_,
				),
				null === (t = this.get('parent')) ||
					void 0 === t ||
					t.globalDisabled.emitter.on(
						'change',
						this.onParentGlobalDisabledChange_,
					),
				this.updateGlobalDisabled_();
		}
	}
	const y = u(''),
		C = {veryfirst: 'vfst', first: 'fst', last: 'lst', verylast: 'vlst'};
	class F {
		constructor(e) {
			(this.parent_ = null),
				(this.blade = e.blade),
				(this.view = e.view),
				(this.viewProps = e.viewProps);
			const t = this.view.element;
			this.blade.value('positions').emitter.on('change', () => {
				['veryfirst', 'first', 'last', 'verylast'].forEach((e) => {
					t.classList.remove(y(void 0, C[e]));
				}),
					this.blade.get('positions').forEach((e) => {
						t.classList.add(y(void 0, C[e]));
					});
			}),
				this.viewProps.handleDispose(() => {
					!(function (e) {
						e && e.parentElement && e.parentElement.removeChild(e);
					})(t);
				});
		}
		get parent() {
			return this.parent_;
		}
		set parent(e) {
			if (((this.parent_ = e), !('parent' in this.viewProps.valMap_)))
				return (
					(t = {
						key: 'parent',
						target: _.name,
						place: 'BladeController.parent',
					}),
					void console.warn(
						[
							`Missing '${t.key}' of ${t.target} in ${t.place}.`,
							'Please rebuild plugins with the latest core package.',
						].join(' '),
					)
				);
			var t;
			this.viewProps.set(
				'parent',
				this.parent_ ? this.parent_.viewProps : null,
			);
		}
	}
	const E = 'http://www.w3.org/2000/svg';
	function M(e) {
		return (t) => t.toFixed(Math.max(Math.min(e, 20), 0));
	}
	M(0);
	function S(e, t, n, o, a) {
		return o + ((e - t) / (n - t)) * (a - o);
	}
	function $(e, t, n) {
		return Math.min(Math.max(e, t), n);
	}
	function N(e, t) {
		return ((e % t) + t) % t;
	}
	function B(e) {
		return [e[0], e[1], e[2]];
	}
	const j = {
		hsl: {
			hsl: (e, t, n) => [e, t, n],
			hsv: function (e, t, n) {
				const o = n + (t * (100 - Math.abs(2 * n - 100))) / 200;
				return [
					e,
					0 !== o ? (t * (100 - Math.abs(2 * n - 100))) / o : 0,
					n + (t * (100 - Math.abs(2 * n - 100))) / 200,
				];
			},
			rgb: function (e, t, n) {
				const o = ((e % 360) + 360) % 360,
					a = $(t / 100, 0, 1),
					r = $(n / 100, 0, 1),
					l = (1 - Math.abs(2 * r - 1)) * a,
					i = l * (1 - Math.abs(((o / 60) % 2) - 1)),
					s = r - l / 2;
				let d, c, u;
				return (
					([d, c, u] =
						o >= 0 && o < 60
							? [l, i, 0]
							: o >= 60 && o < 120
							? [i, l, 0]
							: o >= 120 && o < 180
							? [0, l, i]
							: o >= 180 && o < 240
							? [0, i, l]
							: o >= 240 && o < 300
							? [i, 0, l]
							: [l, 0, i]),
					[255 * (d + s), 255 * (c + s), 255 * (u + s)]
				);
			},
		},
		hsv: {
			hsl: function (e, t, n) {
				const o = 100 - Math.abs((n * (200 - t)) / 100 - 100);
				return [e, 0 !== o ? (t * n) / o : 0, (n * (200 - t)) / 200];
			},
			hsv: (e, t, n) => [e, t, n],
			rgb: function (e, t, n) {
				const o = N(e, 360),
					a = $(t / 100, 0, 1),
					r = $(n / 100, 0, 1),
					l = r * a,
					i = l * (1 - Math.abs(((o / 60) % 2) - 1)),
					s = r - l;
				let d, c, u;
				return (
					([d, c, u] =
						o >= 0 && o < 60
							? [l, i, 0]
							: o >= 60 && o < 120
							? [i, l, 0]
							: o >= 120 && o < 180
							? [0, l, i]
							: o >= 180 && o < 240
							? [0, i, l]
							: o >= 240 && o < 300
							? [i, 0, l]
							: [l, 0, i]),
					[255 * (d + s), 255 * (c + s), 255 * (u + s)]
				);
			},
		},
		rgb: {
			hsl: function (e, t, n) {
				const o = $(e / 255, 0, 1),
					a = $(t / 255, 0, 1),
					r = $(n / 255, 0, 1),
					l = Math.max(o, a, r),
					i = Math.min(o, a, r),
					s = l - i;
				let d = 0,
					c = 0;
				const u = (i + l) / 2;
				return (
					0 !== s &&
						((c = s / (1 - Math.abs(l + i - 1))),
						(d =
							o === l
								? (a - r) / s
								: a === l
								? 2 + (r - o) / s
								: 4 + (o - a) / s),
						(d = d / 6 + (d < 0 ? 1 : 0))),
					[360 * d, 100 * c, 100 * u]
				);
			},
			hsv: function (e, t, n) {
				const o = $(e / 255, 0, 1),
					a = $(t / 255, 0, 1),
					r = $(n / 255, 0, 1),
					l = Math.max(o, a, r),
					i = l - Math.min(o, a, r);
				let s;
				return (
					(s =
						0 === i
							? 0
							: l === o
							? (((((a - r) / i) % 6) + 6) % 6) * 60
							: l === a
							? 60 * ((r - o) / i + 2)
							: 60 * ((o - a) / i + 4)),
					[s, 100 * (0 === l ? 0 : i / l), 100 * l]
				);
			},
			rgb: (e, t, n) => [e, t, n],
		},
	};
	function A(e, t) {
		return [
			'float' === t ? 1 : 'rgb' === e ? 255 : 360,
			'float' === t ? 1 : 'rgb' === e ? 255 : 100,
			'float' === t ? 1 : 'rgb' === e ? 255 : 100,
		];
	}
	function z(e, t, n, o) {
		const a = A(t, n),
			r = A(t, o);
		return e.map((e, t) => (e / a[t]) * r[t]);
	}
	function D(e, t) {
		return (
			'object' == typeof e && null != e && t in e && 'number' == typeof e[t]
		);
	}
	class O {
		static black(e = 'int') {
			return new O([0, 0, 0], 'rgb', e);
		}
		static fromObject(e, t = 'int') {
			const n = 'a' in e ? [e.r, e.g, e.b, e.a] : [e.r, e.g, e.b];
			return new O(n, 'rgb', t);
		}
		static toRgbaObject(e, t = 'int') {
			return e.toRgbaObject(t);
		}
		static isRgbColorObject(e) {
			return D(e, 'r') && D(e, 'g') && D(e, 'b');
		}
		static isRgbaColorObject(e) {
			return this.isRgbColorObject(e) && D(e, 'a');
		}
		static isColorObject(e) {
			return this.isRgbColorObject(e);
		}
		static equals(e, t) {
			if (e.mode !== t.mode) return !1;
			const n = e.comps_,
				o = t.comps_;
			for (let e = 0; e < n.length; e++) if (n[e] !== o[e]) return !1;
			return !0;
		}
		constructor(e, t, n = 'int') {
			(this.mode = t),
				(this.type = n),
				(this.comps_ = (function (e, t, n) {
					var o;
					const a = A(t, n);
					return [
						'rgb' === t
							? $(e[0], 0, a[0])
							: ((r = e[0]), (l = a[0]), r === l ? l : N(r, l)),
						$(e[1], 0, a[1]),
						$(e[2], 0, a[2]),
						$(null !== (o = e[3]) && void 0 !== o ? o : 1, 0, 1),
					];
					var r, l;
				})(e, t, n));
		}
		getComponents(e, t = 'int') {
			return (
				(n = (function (e, t, n) {
					const o = z(e, t.mode, t.type, 'int');
					return z(j[t.mode][n.mode](...o), n.mode, 'int', n.type);
				})(
					B(this.comps_),
					{mode: this.mode, type: this.type},
					{mode: null != e ? e : this.mode, type: t},
				)),
				(o = this.comps_[3]),
				[n[0], n[1], n[2], o]
			);
			var n, o;
		}
		toRgbaObject(e = 'int') {
			const t = this.getComponents('rgb', e);
			return {r: t[0], g: t[1], b: t[2], a: t[3]};
		}
	}
	function V(e, t) {
		const n = e.match(/^(.+)%$/);
		return n
			? Math.min(0.01 * parseFloat(n[1]) * t, t)
			: Math.min(parseFloat(e), t);
	}
	const q = {
		deg: (e) => e,
		grad: (e) => (360 * e) / 400,
		rad: (e) => (360 * e) / (2 * Math.PI),
		turn: (e) => 360 * e,
	};
	function T(e) {
		const t = e.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
		if (!t) return parseFloat(e);
		const n = parseFloat(t[1]),
			o = t[2];
		return q[o](n);
	}
	function L(e) {
		return (t) => {
			const n = (function (e) {
				const t = e.match(
					/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/,
				);
				if (!t) return null;
				const n = [V(t[1], 255), V(t[2], 255), V(t[3], 255)];
				return isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2]) ? null : n;
			})(t);
			return n ? new O(n, 'rgb', e) : null;
		};
	}
	function G(e) {
		return (t) => {
			const n = (function (e) {
				const t = e.match(
					/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/,
				);
				if (!t) return null;
				const n = [V(t[1], 255), V(t[2], 255), V(t[3], 255), V(t[4], 1)];
				return isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2]) || isNaN(n[3])
					? null
					: n;
			})(t);
			return n ? new O(n, 'rgb', e) : null;
		};
	}
	function R(e) {
		return (t) => {
			const n = (function (e) {
				const t = e.match(
					/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/,
				);
				if (!t) return null;
				const n = [T(t[1]), V(t[2], 100), V(t[3], 100)];
				return isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2]) ? null : n;
			})(t);
			return n ? new O(n, 'hsl', e) : null;
		};
	}
	function W(e) {
		return (t) => {
			const n = (function (e) {
				const t = e.match(
					/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/,
				);
				if (!t) return null;
				const n = [T(t[1]), V(t[2], 100), V(t[3], 100), V(t[4], 1)];
				return isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2]) || isNaN(n[3])
					? null
					: n;
			})(t);
			return n ? new O(n, 'hsl', e) : null;
		};
	}
	function J(e) {
		const t = (function (e) {
			const t = e.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
			if (t)
				return [
					parseInt(t[1] + t[1], 16),
					parseInt(t[2] + t[2], 16),
					parseInt(t[3] + t[3], 16),
				];
			const n = e.match(
				/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/,
			);
			return n
				? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
				: null;
		})(e);
		return t ? new O(t, 'rgb', 'int') : null;
	}
	function U(e) {
		const t = (function (e) {
			const t = e.match(
				/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/,
			);
			if (t)
				return [
					parseInt(t[1] + t[1], 16),
					parseInt(t[2] + t[2], 16),
					parseInt(t[3] + t[3], 16),
					S(parseInt(t[4] + t[4], 16), 0, 255, 0, 1),
				];
			const n = e.match(
				/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/,
			);
			return n
				? [
						parseInt(n[1], 16),
						parseInt(n[2], 16),
						parseInt(n[3], 16),
						S(parseInt(n[4], 16), 0, 255, 0, 1),
				  ]
				: null;
		})(e);
		return t ? new O(t, 'rgb', 'int') : null;
	}
	function H(e) {
		return (t) => {
			const n = (function (e) {
				const t = e.match(
					/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/,
				);
				if (!t) return null;
				const n = [parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3])];
				return isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2]) ? null : n;
			})(t);
			return n ? new O(n, 'rgb', e) : null;
		};
	}
	function K(e) {
		return (t) => {
			const n = (function (e) {
				const t = e.match(
					/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/,
				);
				if (!t) return null;
				const n = [
					parseFloat(t[1]),
					parseFloat(t[2]),
					parseFloat(t[3]),
					parseFloat(t[4]),
				];
				return isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2]) || isNaN(n[3])
					? null
					: n;
			})(t);
			return n ? new O(n, 'rgb', e) : null;
		};
	}
	const Y = {
		'func.rgb': L('int'),
		'func.rgba': G('int'),
		'func.hsl': R('int'),
		'func.hsla': W('int'),
		'hex.rgb': J,
		'hex.rgba': U,
	};
	const Q = (e) => {
			const t = (function (e) {
				return Object.keys(Y).reduce(
					(t, n) => t || ((0, Y[n])(e) ? n : null),
					null,
				);
			})(e);
			return t ? Y[t](e) : null;
		},
		X = {
			int: [J, U, L('int'), G('int'), R('int'), W('int'), H('int'), K('int')],
			float: [
				L('float'),
				G('float'),
				R('float'),
				W('float'),
				H('float'),
				K('float'),
			],
		};
	function Z(e) {
		if ('string' == typeof e) {
			const t = Q(e);
			if (t) return t;
		}
		return O.black();
	}
	function ee(e) {
		return (t) =>
			(function (e, t) {
				const n = M('float' === t ? 2 : 0);
				return `rgb(${B(e.getComponents('rgb', t))
					.map((e) => n(e))
					.join(', ')})`;
			})(t, e);
	}
	function te(e, t) {
		const n = M(2),
			o = M('float' === t ? 2 : 0);
		return `rgba(${e
			.getComponents('rgb', t)
			.map((e, t) => (3 === t ? n : o)(e))
			.join(', ')})`;
	}
	function ne(e) {
		return (t) => te(t, e);
	}
	function oe(e) {
		return (t) =>
			(function (e, t) {
				const n = M('float' === t ? 2 : 0),
					o = ['r', 'g', 'b'];
				return `{${B(e.getComponents('rgb', t))
					.map((e, t) => `${o[t]}: ${n(e)}`)
					.join(', ')}}`;
			})(t, e);
	}
	function ae(e) {
		return (t) =>
			(function (e, t) {
				const n = M(2),
					o = M('float' === t ? 2 : 0),
					a = ['r', 'g', 'b', 'a'];
				return `{${e
					.getComponents('rgb', t)
					.map((e, t) => `${a[t]}: ${(3 === t ? n : o)(e)}`)
					.join(', ')}}`;
			})(t, e);
	}
	function re(e) {
		return 'number' != typeof e
			? O.black()
			: new O([((t = e) >> 16) & 255, (t >> 8) & 255, 255 & t], 'rgb');
		var t;
	}
	['int', 'float'].reduce(
		(e, t) => [
			...e,
			{
				format: {alpha: !1, mode: 'rgb', notation: 'func', type: t},
				stringifier: ee(t),
			},
			{
				format: {alpha: !0, mode: 'rgb', notation: 'func', type: t},
				stringifier: ne(t),
			},
			{
				format: {alpha: !1, mode: 'rgb', notation: 'object', type: t},
				stringifier: oe(t),
			},
			{
				format: {alpha: !0, mode: 'rgb', notation: 'object', type: t},
				stringifier: ae(t),
			},
		],
		[],
	);
	const le = {
		default: () => ({
			'base-background-color': 'hsla(230, 7%, 17%, 1)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
			'button-background-color': 'hsla(230, 7%, 70%, 1)',
			'button-background-color-active': 'hsla(230, 7%, 85%, 1)',
			'button-background-color-focus': 'hsla(230, 7%, 80%, 1)',
			'button-background-color-hover': 'hsla(230, 7%, 75%, 1)',
			'button-foreground-color': 'hsla(230, 7%, 17%, 1)',
			'container-background-color': 'hsla(230, 7%, 75%, 0.1)',
			'container-background-color-active': 'hsla(230, 7%, 75%, 0.25)',
			'container-background-color-focus': 'hsla(230, 7%, 75%, 0.2)',
			'container-background-color-hover': 'hsla(230, 7%, 75%, 0.15)',
			'container-foreground-color': 'hsla(230, 7%, 75%, 1)',
			'groove-foreground-color': 'hsla(230, 7%, 75%, 0.1)',
			'input-background-color': 'hsla(230, 7%, 75%, 0.1)',
			'input-background-color-active': 'hsla(230, 7%, 75%, 0.25)',
			'input-background-color-focus': 'hsla(230, 7%, 75%, 0.2)',
			'input-background-color-hover': 'hsla(230, 7%, 75%, 0.15)',
			'input-foreground-color': 'hsla(230, 7%, 75%, 1)',
			'label-foreground-color': 'hsla(230, 7%, 75%, 0.7)',
			'monitor-background-color': 'hsla(230, 7%, 0%, 0.2)',
			'monitor-foreground-color': 'hsla(230, 7%, 75%, 0.7)',
		}),
		jetblack: () => ({
			'base-background-color': 'hsla(0, 0%, 0%, 1)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
			'button-background-color': 'hsla(0, 0%, 70%, 1)',
			'button-background-color-active': 'hsla(0, 0%, 85%, 1)',
			'button-background-color-focus': 'hsla(0, 0%, 80%, 1)',
			'button-background-color-hover': 'hsla(0, 0%, 75%, 1)',
			'button-foreground-color': 'hsla(0, 0%, 0%, 1)',
			'container-background-color': 'hsla(0, 0%, 10%, 1)',
			'container-background-color-active': 'hsla(0, 0%, 25%, 1)',
			'container-background-color-focus': 'hsla(0, 0%, 20%, 1)',
			'container-background-color-hover': 'hsla(0, 0%, 15%, 1)',
			'container-foreground-color': 'hsla(0, 0%, 50%, 1)',
			'groove-foreground-color': 'hsla(0, 0%, 10%, 1)',
			'input-background-color': 'hsla(0, 0%, 10%, 1)',
			'input-background-color-active': 'hsla(0, 0%, 25%, 1)',
			'input-background-color-focus': 'hsla(0, 0%, 20%, 1)',
			'input-background-color-hover': 'hsla(0, 0%, 15%, 1)',
			'input-foreground-color': 'hsla(0, 0%, 70%, 1)',
			'label-foreground-color': 'hsla(0, 0%, 50%, 1)',
			'monitor-background-color': 'hsla(0, 0%, 8%, 1)',
			'monitor-foreground-color': 'hsla(0, 0%, 48%, 1)',
		}),
		light: () => ({
			'base-background-color': 'hsla(230, 5%, 90%, 1)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.1)',
			'button-background-color': 'hsla(230, 7%, 75%, 1)',
			'button-background-color-active': 'hsla(230, 7%, 60%, 1)',
			'button-background-color-focus': 'hsla(230, 7%, 65%, 1)',
			'button-background-color-hover': 'hsla(230, 7%, 70%, 1)',
			'button-foreground-color': 'hsla(230, 10%, 30%, 1)',
			'container-background-color': 'hsla(230, 15%, 30%, 0.2)',
			'container-background-color-active': 'hsla(230, 15%, 30%, 0.32)',
			'container-background-color-focus': 'hsla(230, 15%, 30%, 0.28)',
			'container-background-color-hover': 'hsla(230, 15%, 30%, 0.24)',
			'container-foreground-color': 'hsla(230, 10%, 30%, 1)',
			'groove-foreground-color': 'hsla(230, 15%, 30%, 0.1)',
			'input-background-color': 'hsla(230, 15%, 30%, 0.1)',
			'input-background-color-active': 'hsla(230, 15%, 30%, 0.22)',
			'input-background-color-focus': 'hsla(230, 15%, 30%, 0.18)',
			'input-background-color-hover': 'hsla(230, 15%, 30%, 0.14)',
			'input-foreground-color': 'hsla(230, 10%, 30%, 1)',
			'label-foreground-color': 'hsla(230, 10%, 30%, 0.7)',
			'monitor-background-color': 'hsla(230, 15%, 30%, 0.1)',
			'monitor-foreground-color': 'hsla(230, 10%, 30%, 0.5)',
		}),
		iceberg: () => ({
			'base-background-color': 'hsla(230, 20%, 11%, 1)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
			'button-background-color': 'hsla(230, 10%, 80%, 1)',
			'button-background-color-active': 'hsla(230, 10%, 95%, 1)',
			'button-background-color-focus': 'hsla(230, 10%, 90%, 1)',
			'button-background-color-hover': 'hsla(230, 10%, 85%, 1)',
			'button-foreground-color': 'hsla(230, 20%, 11%, 1)',
			'container-background-color': 'hsla(230, 25%, 16%, 1)',
			'container-background-color-active': 'hsla(230, 25%, 31%, 1)',
			'container-background-color-focus': 'hsla(230, 25%, 26%, 1)',
			'container-background-color-hover': 'hsla(230, 25%, 21%, 1)',
			'container-foreground-color': 'hsla(230, 10%, 80%, 1)',
			'groove-foreground-color': 'hsla(230, 20%, 8%, 1)',
			'input-background-color': 'hsla(230, 20%, 8%, 1)',
			'input-background-color-active': 'hsla(230, 28%, 23%, 1)',
			'input-background-color-focus': 'hsla(230, 28%, 18%, 1)',
			'input-background-color-hover': 'hsla(230, 20%, 13%, 1)',
			'input-foreground-color': 'hsla(230, 10%, 80%, 1)',
			'label-foreground-color': 'hsla(230, 12%, 48%, 1)',
			'monitor-background-color': 'hsla(230, 20%, 8%, 1)',
			'monitor-foreground-color': 'hsla(230, 12%, 48%, 1)',
		}),
		retro: () => ({
			'base-background-color': 'hsla(40, 3%, 90%, 1)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.3)',
			'button-background-color': 'hsla(40, 3%, 70%, 1)',
			'button-background-color-active': 'hsla(40, 3%, 55%, 1)',
			'button-background-color-focus': 'hsla(40, 3%, 60%, 1)',
			'button-background-color-hover': 'hsla(40, 3%, 65%, 1)',
			'button-foreground-color': 'hsla(40, 3%, 20%, 1)',
			'container-background-color': 'hsla(40, 3%, 70%, 1)',
			'container-background-color-active': 'hsla(40, 3%, 55%, 1)',
			'container-background-color-focus': 'hsla(40, 3%, 60%, 1)',
			'container-background-color-hover': 'hsla(40, 3%, 65%, 1)',
			'container-foreground-color': 'hsla(40, 3%, 20%, 1)',
			'groove-foreground-color': 'hsla(40, 3%, 40%, 1)',
			'input-background-color': 'hsla(120, 3%, 20%, 1)',
			'input-background-color-active': 'hsla(120, 3%, 35%, 1)',
			'input-background-color-focus': 'hsla(120, 3%, 30%, 1)',
			'input-background-color-hover': 'hsla(120, 3%, 25%, 1)',
			'input-foreground-color': 'hsla(120, 40%, 60%, 1)',
			'label-foreground-color': 'hsla(40, 3%, 50%, 1)',
			'monitor-background-color': 'hsla(120, 3%, 20%, 1)',
			'monitor-foreground-color': 'hsla(120, 40%, 60%, 0.8)',
		}),
		translucent: () => ({
			'base-background-color': 'hsla(0, 0%, 10%, 0.8)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
			'button-background-color': 'hsla(0, 0%, 80%, 1)',
			'button-background-color-active': 'hsla(0, 0%, 100%, 1)',
			'button-background-color-focus': 'hsla(0, 0%, 95%, 1)',
			'button-background-color-hover': 'hsla(0, 0%, 85%, 1)',
			'button-foreground-color': 'hsla(0, 0%, 0%, 0.8)',
			'container-background-color': 'hsla(0, 0%, 0%, 0.3)',
			'container-background-color-active': 'hsla(0, 0%, 0%, 0.6)',
			'container-background-color-focus': 'hsla(0, 0%, 0%, 0.5)',
			'container-background-color-hover': 'hsla(0, 0%, 0%, 0.4)',
			'container-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
			'groove-foreground-color': 'hsla(0, 0%, 0%, 0.2)',
			'input-background-color': 'hsla(0, 0%, 0%, 0.3)',
			'input-background-color-active': 'hsla(0, 0%, 0%, 0.6)',
			'input-background-color-focus': 'hsla(0, 0%, 0%, 0.5)',
			'input-background-color-hover': 'hsla(0, 0%, 0%, 0.4)',
			'input-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
			'label-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
			'monitor-background-color': 'hsla(0, 0%, 0%, 0.3)',
			'monitor-foreground-color': 'hsla(0, 0%, 100%, 0.3)',
		}),
		vivid: () => ({
			'base-background-color': 'hsla(0, 80%, 40%, 1)',
			'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
			'button-background-color': 'hsla(0, 0%, 100%, 1)',
			'button-background-color-active': 'hsla(0, 0%, 85%, 1)',
			'button-background-color-focus': 'hsla(0, 0%, 90%, 1)',
			'button-background-color-hover': 'hsla(0, 0%, 95%, 1)',
			'button-foreground-color': 'hsla(230, 20%, 11%, 1)',
			'container-background-color': 'hsla(0, 0%, 0%, 0.2)',
			'container-background-color-active': 'hsla(0, 0%, 0%, 0.35)',
			'container-background-color-focus': 'hsla(0, 0%, 0%, 0.3)',
			'container-background-color-hover': 'hsla(0, 0%, 0%, 0.25)',
			'container-foreground-color': 'hsla(0, 0%, 100%, 0.9)',
			'groove-foreground-color': 'hsla(0, 0%, 0%, 0.5)',
			'input-background-color': 'hsla(0, 0%, 0%, 0.5)',
			'input-background-color-active': 'hsla(0, 0%, 0%, 0.65)',
			'input-background-color-focus': 'hsla(0, 0%, 0%, 0.60)',
			'input-background-color-hover': 'hsla(0, 0%, 0%, 0.55)',
			'input-foreground-color': 'hsla(0, 0%, 100%, 0.9)',
			'label-foreground-color': 'hsla(0, 0%, 100%, 0.9)',
			'monitor-background-color': 'hsla(0, 0%, 0%, 0.5)',
			'monitor-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
		}),
	};
	function ie(e) {
		return le[e]();
	}
	const se = [
		{
			name: 'Base',
			expanded: !0,
			props: ['base-background-color', 'base-shadow-color'],
			label: (e) => {
				var t;
				const n = e.match(/^base-(.+)-color$/);
				return null !== (t = n && n[1]) && void 0 !== t ? t : e;
			},
		},
		{
			name: 'Input',
			props: [
				'input-foreground-color',
				'input-background-color',
				'input-background-color:state',
			],
			label: (e) => {
				var t, n;
				const o = e.match(/^input-(.+)-color(-.+)?$/);
				return null !==
					(n = o && `${o[1]}${null !== (t = o[2]) && void 0 !== t ? t : ''}`) &&
					void 0 !== n
					? n
					: e;
			},
		},
		{
			name: 'Monitor',
			props: ['monitor-foreground-color', 'monitor-background-color'],
			label: (e) => {
				var t, n;
				const o = e.match(/^monitor-(.+)-color(-.+)?$/);
				return null !==
					(n = o && `${o[1]}${null !== (t = o[2]) && void 0 !== t ? t : ''}`) &&
					void 0 !== n
					? n
					: e;
			},
		},
		{
			name: 'Button',
			props: [
				'button-foreground-color',
				'button-background-color',
				'button-background-color:state',
			],
			label: (e) => {
				var t, n;
				const o = e.match(/^button-(.+)-color(-.+)?$/);
				return null !==
					(n = o && `${o[1]}${null !== (t = o[2]) && void 0 !== t ? t : ''}`) &&
					void 0 !== n
					? n
					: e;
			},
		},
		{
			name: 'Container',
			props: [
				'container-foreground-color',
				'container-background-color',
				'container-background-color:state',
			],
			label: (e) => {
				var t, n;
				const o = e.match(/^container-(.+)-color(-.+)?$/);
				return null !==
					(n = o && `${o[1]}${null !== (t = o[2]) && void 0 !== t ? t : ''}`) &&
					void 0 !== n
					? n
					: e;
			},
		},
		{
			name: 'Misc',
			expanded: !0,
			props: ['label-foreground-color', 'groove-foreground-color'],
			label: (e) => {
				var t, n;
				const o = e.match(/^(.+)-color(-.+)?$/);
				return null !==
					(n = o && `${o[1]}${null !== (t = o[2]) && void 0 !== t ? t : ''}`) &&
					void 0 !== n
					? n
					: e;
			},
		},
	];
	function de(e, t) {
		return [
			`${e} {`,
			...Object.keys(t).reduce((e, n) => {
				const o = t[n];
				return [].concat(e, `  --tp-${n}: ${o};`);
			}, []),
			'}',
		].join('\n');
	}
	function ce(t) {
		const n = new e.Pane({container: t, title: 'Theme'});
		return (
			n.addInput({text: 0}, 'text'),
			n.addInput({slider: 0}, 'slider', {min: -1, max: 1}),
			n.addButton({title: 'Button'}),
			n
		);
	}
	function ue() {
		const t = location.search.includes('disabled');
		location.search.includes('readme') &&
			document.documentElement.classList.add('readme'),
			['jetblack', 'iceberg', 'light'].forEach((e) => {
				const t = ie(e),
					n = document.createElement('style');
				(n.textContent = de(`*[data-pane-${e}theme]`, t)),
					document.head.appendChild(n);
			});
		const n = {
				numberinput: (n) => {
					const o = {number: 0},
						a = new e.Pane({container: n, title: 'Number'});
					return (
						a.addInput(o, 'number', {disabled: t, label: 'text'}),
						a.addInput(o, 'number', {
							disabled: t,
							label: 'slider',
							min: -100,
							max: 100,
						}),
						a.addInput(o, 'number', {
							disabled: t,
							label: 'list',
							options: {option: 0},
						}),
						a
					);
				},
				stringinput: (n) => {
					const o = {string: 'text'},
						a = new e.Pane({container: n, title: 'String'});
					return (
						a.addInput(o, 'string', {disabled: t, label: 'text'}),
						a.addInput(o, 'string', {
							disabled: t,
							label: 'list',
							options: {option: 'text'},
						}),
						a
					);
				},
				boolinput: (n) => {
					const o = new e.Pane({container: n, title: 'Boolean'});
					return (
						o.addInput({bool: !0}, 'bool', {disabled: t, label: 'checkbox'}), o
					);
				},
				colorinput: (n) => {
					const o = new e.Pane({container: n, title: 'Color'});
					return (
						o.addInput({color: '#ff00007f'}, 'color', {
							disabled: t,
							expanded: !0,
							label: 'picker',
							picker: 'inline',
						}),
						o
					);
				},
				pointinput: (n) => {
					const o = {
							p2d: {x: 0, y: 0},
							p3d: {x: 0, y: 0, z: 0},
							p4d: {x: 0, y: 0, z: 0, w: 0},
						},
						a = new e.Pane({container: n, title: 'Point'});
					return (
						a.addInput(o, 'p2d', {
							disabled: t,
							expanded: !0,
							label: '2d-picker',
							picker: 'inline',
						}),
						a.addInput(o, 'p3d', {disabled: t, label: '3d-text'}),
						a.addInput(o, 'p4d', {disabled: t, label: '4d-text'}),
						a
					);
				},
				numbermonitor: (n) => {
					const o = {number: 0};
					let a = 0;
					setInterval(() => {
						(o.number = r(a)), (a += 1);
					}, 50);
					const l = new e.Pane({container: n, title: 'Number'});
					return (
						l.addMonitor(o, 'number', {disabled: t, label: 'text'}),
						l.addMonitor(o, 'number', {
							bufferSize: 10,
							disabled: t,
							label: 'multiline',
						}),
						l.addMonitor(o, 'number', {
							disabled: t,
							label: 'graph',
							max: 1,
							min: -1,
							view: 'graph',
						}),
						l
					);
				},
				stringmonitor: (n) => {
					const o = {string: new Date().toISOString()};
					setInterval(() => {
						o.string = new Date().toISOString();
					}, 1e3);
					const a = new e.Pane({container: n, title: 'String'});
					return (
						a.addMonitor(o, 'string', {
							disabled: t,
							interval: 1e3,
							label: 'text',
						}),
						a.addMonitor(o, 'string', {
							bufferSize: 10,
							disabled: t,
							interval: 1e3,
							label: 'multiline',
						}),
						a
					);
				},
				boolmonitor: (n) => {
					const o = {bool: !0};
					setInterval(() => {
						o.bool = !o.bool;
					}, 1e3);
					const a = new e.Pane({container: n, title: 'Boolean'});
					return (
						a.addMonitor(o, 'bool', {
							disabled: t,
							interval: 1e3,
							label: 'text',
						}),
						a.addMonitor(o, 'bool', {
							bufferSize: 10,
							disabled: t,
							interval: 1e3,
							label: 'multiline',
						}),
						a
					);
				},
				folder: (n) => {
					const o = new e.Pane({container: n, title: 'Folder'}),
						a = o.addFolder({title: 'Folder'});
					a.addInput({param: 0}, 'param', {disabled: t});
					return (
						a
							.addFolder({title: 'Subfolder'})
							.addInput({param: 0}, 'param', {disabled: t}),
						o
					);
				},
				tab: (n) => {
					const o = new e.Pane({container: n, title: 'Tab'}),
						a = o.addTab({pages: [{title: 'Page'}, {title: 'Page'}]});
					a.pages[0].addInput({param: 0}, 'param', {disabled: t});
					return (
						a.pages[0]
							.addTab({pages: [{title: 'Page'}, {title: 'Page'}]})
							.pages[0].addInput({param: 0}, 'param', {disabled: t}),
						o
					);
				},
				button: (n) => {
					const o = new e.Pane({container: n, title: 'Button'});
					return (
						o.addButton({disabled: t, label: 'label', title: 'Button'}),
						o.addButton({disabled: t, title: 'Button'}),
						o
					);
				},
				separator: (n) => {
					const o = new e.Pane({container: n, title: 'Separator'});
					return (
						o.addInput({param: 0}, 'param', {disabled: t}),
						o.addSeparator(),
						o.addInput({param: 0}, 'param', {disabled: t}),
						o
					);
				},
				icebergtheme: (e) => ce(e),
				jetblacktheme: (e) => ce(e),
				lighttheme: (e) => ce(e),
				blades: (n) => {
					const o = new e.Pane({container: n, title: 'Blades'});
					return (
						[
							{disabled: t, label: 'label', title: 'Button', view: 'button'},
							{disabled: t, view: 'separator'},
							{disabled: t, expanded: !1, title: 'Folder', view: 'folder'},
							{
								disabled: t,
								label: 'label',
								parse: (e) => e,
								value: 'text',
								view: 'text',
							},
							{
								disabled: t,
								label: 'label',
								options: {option: 0},
								value: 0,
								view: 'list',
							},
							{
								disabled: t,
								label: 'label',
								max: 100,
								min: 0,
								value: 50,
								view: 'slider',
							},
							{
								disabled: t,
								pages: [{title: 'Tab'}, {title: 'Tab'}],
								view: 'tab',
							},
						].forEach((e) => {
							o.addBlade(e);
						}),
						o
					);
				},
				rootfolder: (t) => {
					const n = new e.Pane({container: t});
					var o;
					return (
						(o = n.addFolder({title: 'Root Folder'})).addInput(
							{param: 0},
							'param',
						),
						o.addInput({param: 0}, 'param'),
						n
					);
				},
				roottab: (t) => {
					const n = new e.Pane({container: t}),
						o = n.addTab({pages: [{title: 'Root'}, {title: 'Tab'}]});
					return (
						o.pages[0].addInput({param: 0}, 'param'),
						o.pages[0].addInput({param: 0}, 'param'),
						n
					);
				},
				nestedfolders: (t) => {
					const n = new e.Pane({container: t, title: 'Nested Folders'});
					var o, a;
					return (
						(o = n.addFolder({title: 'Folder'})),
						(a = o.addFolder({title: 'Folder'})).addInput({param: 0}, 'param'),
						a.addInput({param: 0}, 'param'),
						((e) => {
							e.addInput({param: 0}, 'param'), e.addInput({param: 0}, 'param');
						})(o.addFolder({title: 'Folder'})),
						n
					);
				},
				containerlist: (t) => {
					const n = new e.Pane({container: t}),
						o = n.addFolder({title: 'Container List'});
					return (
						o.addFolder({title: 'Folder'}).addInput({param: 0}, 'param'),
						o
							.addTab({pages: [{title: 'Page'}, {title: 'Page'}]})
							.pages[0].addInput({param: 0}, 'param'),
						((e) => {
							e.addInput({param: 0}, 'param');
						})(o.addFolder({title: 'Folder'})),
						n
					);
				},
			},
			o = {};
		Object.keys(n).forEach((e) => {
			const t = (0, n[e])(a(e));
			o[e] = t;
		}),
			(window.panes = o);
	}
	function he() {
		const t = {
			hello: (t) => {
				new e.Pane({container: t});
			},
		};
		Object.keys(t).forEach((e) => {
			(0, t[e])(a(e));
		});
	}
	function pe(e, t, n, o, a) {
		return o + ((e - t) / (n - t)) * (a - o);
	}
	function be(e, t, n, o) {
		const a = n - e,
			r = o - t;
		return Math.sqrt(a * a + r * r);
	}
	class ge {
		constructor(e) {
			(this.x = 0),
				(this.y = 0),
				(this.en = 0),
				(this.element = document.createElementNS(E, 'circle')),
				(this.env_ = e);
		}
		update() {
			this.element.setAttributeNS(null, 'cx', `${this.x}px`),
				this.element.setAttributeNS(null, 'cy', `${this.y}px`);
			const e = pe(1 - Math.pow(0.9, this.en), 0, 1, 1, this.env_.maxSize);
			this.element.setAttributeNS(null, 'r', `${e}px`);
		}
	}
	class me {
		constructor(e, t) {
			(this.height_ = 0),
				(this.width_ = 0),
				(this.onTick_ = this.onTick_.bind(this)),
				(this.elem_ = e),
				(this.env_ = t),
				(this.dots_ = []),
				(this.t_ = 0);
			const n = document.createElementNS(E, 'svg');
			this.elem_.appendChild(n),
				(this.svgElem_ = n),
				(this.dotsElem_ = document.createElementNS(E, 'g')),
				this.svgElem_.appendChild(this.dotsElem_),
				window.addEventListener('resize', () => {
					this.resize();
				}),
				this.resize(),
				this.onTick_();
		}
		reset() {
			const e = this.width_,
				t = this.height_,
				n = this.env_;
			this.dots_ = [];
			const o = n.spacing,
				a = (o * Math.sqrt(3)) / 2,
				r = Math.ceil(e / o),
				l = Math.ceil(t / a),
				i = document.createElementNS(E, 'g');
			i.setAttributeNS(null, 'fill', n.color);
			for (let e = 0; e <= l; e++)
				for (let t = 0; t <= r; t++) {
					const r = new ge(n);
					(r.en = 0),
						(r.x = t * o),
						(r.y = e * a),
						i.appendChild(r.element),
						this.dots_.push(r);
				}
			this.svgElem_.appendChild(i),
				this.svgElem_.removeChild(this.dotsElem_),
				(this.dotsElem_ = i);
		}
		resize() {
			const e = this.elem_.getBoundingClientRect();
			(this.height_ = e.height), (this.width_ = e.width), this.reset();
		}
		onTick_() {
			const e = this.width_,
				t = this.height_,
				n = this.env_;
			this.dots_.forEach((e) => {
				e.en = 0;
			}),
				(this.t_ -= n.speed);
			const o = this.t_;
			for (let a = 0; a <= 100; a++) {
				const r = pe(a, 0, 100, 0, 1),
					l = r * e + Math.sin(r * n.freq.x + o) * n.amp.x * e,
					i = t / 2 + Math.sin(o + r * n.freq.y) * n.amp.y * t;
				this.dots_.forEach((e) => {
					const t = be(e.x, e.y, l, i);
					e.en += Math.pow(n.range, 0.1 * t);
				});
			}
			this.dots_.forEach((e) => {
				e.update();
			}),
				requestAnimationFrame(this.onTick_);
		}
	}
	const fe = {dark: 'hsl(200deg, 5%, 16%)', light: 'hsl(200deg, 7%, 90%)'};
	function ve() {
		const t = {
				amp: {x: 0.1, y: 0.5},
				color: 'hsl(0deg, 0, 0)',
				freq: {x: 17, y: 6.3},
				maxSize: 5,
				range: 0,
				spacing: 24,
				speed: 0.02,
				title: 'Tweakpane',
			},
			n = {
				atmos: {
					amp: {x: 0.1, y: 0.53},
					color: '#cacbcd',
					freq: {x: 45, y: 16},
					maxSize: 128,
					range: 0.77,
					spacing: 24,
					speed: 0.02,
					title: 'Tweakpane',
				},
				bubble: {
					amp: {x: 0.3, y: 0.51},
					color: '#f2f2f2',
					freq: {x: 64, y: 32},
					maxSize: 128,
					range: 0.5,
					spacing: 48,
					speed: 0.02,
					title: 'Tweakpane',
				},
				cloud: {
					amp: {x: 0.07, y: 0},
					color: '#e4e4e7',
					freq: {x: 22.25, y: 0},
					maxSize: 105,
					range: 0.63,
					spacing: 48,
					speed: 0.02,
					title: 'Tweakpane',
				},
			},
			o = {presetId: '', presetJson: ''},
			r = document.querySelector('.pageHeader_sketchContainer');
		if (!r) return;
		const l = new me(r, t),
			i = () => {
				const e = document.querySelector('.pageHeader');
				if (!e) return;
				const [n, o, a] = Z(t.color).getComponents('hsl'),
					r = new O([n + 30, o, a < 50 ? a - 4 : a + 5], 'hsl');
				e.style.backgroundColor = te(r);
			},
			s = {
				index: (a) => {
					const r = new e.Pane({container: a, title: 'Parameters'});
					r.addInput(t, 'color').on('change', i),
						r.addInput(t, 'title').on('change', (e) => {
							const t = document.querySelector('.pageHeader_title');
							t && (t.textContent = e.value);
						});
					const s = r.addTab({pages: [{title: 'Layout'}, {title: 'Presets'}]}),
						d = s.pages[0];
					d.addInput(t, 'spacing', {max: 48, min: 24}),
						d.addInput(t, 'range', {max: 1, min: 0}),
						d.addInput(t, 'maxSize', {max: 128, min: 5}),
						d.addInput(t, 'freq', {x: {max: 64, min: 0}, y: {max: 32, min: 0}}),
						d.addInput(t, 'amp', {x: {max: 0.3, min: 0}, y: {max: 1, min: 0}});
					const c = s.pages[1];
					c
						.addInput(o, 'presetId', {
							label: 'preset',
							options: {
								'Import...': '',
								Atmos: 'atmos',
								Bubble: 'bubble',
								Cloud: 'cloud',
							},
						})
						.on('change', (e) => {
							const t = n[e.value];
							t && ((o.presetId = ''), r.importPreset(t));
						}),
						c.addMonitor(o, 'presetJson', {
							label: 'data',
							lineCount: 4,
							multiline: !0,
						}),
						r.on('change', () => {
							l.reset(),
								(o.presetJson = JSON.stringify(r.exportPreset(), null, 2));
						}),
						r.on('fold', () => {
							l.resize(),
								setTimeout(() => {
									l.resize();
								}, 200);
						});
					let u = -0.2;
					const h = setInterval(() => {
							(u = Math.min(u + 0.02, 1)), u >= 1 && clearInterval(h);
							const e = Math.max(u, 0),
								n = e < 0.5 ? 2 * e * e : 1 - 2 * (1 - e) * (1 - e);
							(t.range = S(n, 0, 1, 0, 0.8)),
								(t.maxSize = S(n, 0, 1, 5, 70)),
								r.refresh();
						}, 1e3 / 30),
						p = window.matchMedia('(prefers-color-scheme: dark)'),
						b = () => {
							(t.color = p.matches ? fe.dark : fe.light),
								l.resize(),
								r.refresh();
						};
					p.addEventListener('change', b), b();
				},
			};
		Object.keys(s).forEach((e) => {
			(0, s[e])(a(e));
		});
	}
	function we() {
		const t = {
			input: (t) => {
				const n = {
						b: !0,
						c: '#ff0055',
						n: 50,
						v2: {x: 12, y: 34},
						v3: {x: 12, y: 34, z: 56},
						s: 'string',
					},
					o = new e.Pane({container: t}),
					a = o.addFolder({title: 'Number'});
				a.addInput(n, 'n', {label: 'text'}),
					a.addInput(n, 'n', {label: 'slider', max: 100, min: 0}),
					a.addInput(n, 'n', {
						label: 'list',
						options: {low: 0, medium: 50, high: 100},
					});
				const r = o.addFolder({title: 'String'});
				r.addInput(n, 's', {label: 'text'}),
					r.addInput(n, 's', {
						label: 'list',
						options: {dark: 'Dark', light: 'Light'},
					});
				o.addFolder({title: 'Boolean'}).addInput(n, 'b', {label: 'checkbox'});
				const l = o.addFolder({title: 'Misc'});
				l.addInput(n, 'c', {label: 'color'}),
					l.addInput(n, 'v2', {label: '2d'}),
					l.addInput(n, 'v3', {label: '3d'});
			},
			numbertext: (t) => {
				new e.Pane({container: t})
					.addInput({value: 40}, 'value', {label: 'text'})
					.setValue(123, !1);
			},
			slider: (t) => {
				new e.Pane({container: t})
					.addInput({value: 50}, 'value', {label: 'slider', max: 100, min: 0})
					.setValue(90, !1);
			},
			step: (t) => {
				const n = {speed: 0.5, count: 10},
					o = new e.Pane({container: t});
				o.addInput(n, 'speed', {step: 0.1}).setValue(1.11);
				o.addInput(n, 'count', {
					label: 'count',
					max: 100,
					min: 0,
					step: 10,
				}).setValue(13, !1);
			},
			numberlist: (t) => {
				const n = {quality: 0},
					o = a('numberlist', !0),
					r = {json: ''},
					l = new e.Pane({container: o});
				l.addMonitor(r, 'json', {interval: 0, label: 'PARAMS', multiline: !0});
				const i = () => {
					(r.json = JSON.stringify(n, void 0, 2)), l.refresh();
				};
				new e.Pane({container: t})
					.addInput(n, 'quality', {options: {low: 0, medium: 50, high: 100}})
					.on('change', () => {
						i();
					})
					.setValue(50, !1),
					i();
			},
			numberformatter: (t) => {
				new e.Pane({container: t})
					.addInput({value: 0}, 'value', {
						format: (e) => e.toFixed(6),
						label: 'k',
					})
					.setValue(1);
			},
			stringtext: (t) => {
				new e.Pane({container: t}).addInput({value: 'hello, world'}, 'value', {
					label: 'message',
				});
			},
			stringlist: (t) => {
				const n = {theme: ''},
					o = a('stringlist', !0),
					r = {json: ''},
					l = new e.Pane({container: o});
				l.addMonitor(r, 'json', {interval: 0, label: 'PARAMS', multiline: !0});
				const i = () => {
					(r.json = JSON.stringify(n, void 0, 2)), l.refresh();
				};
				new e.Pane({container: t})
					.addInput(n, 'theme', {
						options: {
							none: '',
							dark: 'dark-theme.json',
							light: 'light-theme.json',
						},
					})
					.on('change', () => {
						i();
					}),
					i();
			},
			checkbox: (t) => {
				new e.Pane({container: t}).addInput({value: !0}, 'value', {
					label: 'hidden',
				});
			},
			objectcolor: (t) => {
				const n = {
						background: {r: 255, g: 0, b: 84},
						tint: {r: 0, g: 255, b: 214, a: 0.5},
					},
					o = new e.Pane({container: t});
				o.addInput(n, 'background').setValue(new O([1, 1, 1, 0], 'rgb')),
					o.addInput(n, 'tint');
			},
			floatcolor: (t) => {
				new e.Pane({container: t})
					.addInput({overlay: {r: 1, g: 0, b: 0.33}}, 'overlay', {
						color: {type: 'float'},
					})
					.setValue(new O([1, 0, 0.5], 'rgb', 'float'));
			},
			stringcolor: (t) => {
				const n = {primary: '#f05', secondary: 'rgb(0, 255, 214)'},
					o = new e.Pane({container: t}),
					a = o.addInput(n, 'primary');
				o.addInput(n, 'secondary'),
					a.setValue(
						(function (e) {
							const t = X[e];
							return (e) => t.reduce((t, n) => t || n(e), null);
						})('int')('#fff'),
					);
			},
			numbercolor: (t) => {
				const n = {background: 16711765, tint: 16766532},
					o = new e.Pane({container: t});
				o.addInput(n, 'background', {view: 'color'}).setValue(re(16777215)),
					o.addInput(n, 'tint', {color: {alpha: !0}});
			},
			inputstring: (t) => {
				new e.Pane({container: t}).addInput({hex: '#0088ff'}, 'hex', {
					view: 'text',
				});
			},
			colorinline: (t) => {
				new e.Pane({container: t}).addInput({key: '#ff0055ff'}, 'key', {
					expanded: !0,
					picker: 'inline',
				});
			},
			point2d: (t) => {
				new e.Pane({container: t})
					.addInput({value: {x: 50, y: 25}}, 'value', {label: 'offset'})
					.setValue(new e.Point2d(100, 10));
			},
			point2dparams: (t) => {
				new e.Pane({container: t})
					.addInput({value: {x: 20, y: 30}}, 'value', {
						label: 'offset',
						x: {step: 20},
						y: {min: 0, max: 100},
					})
					.setValue(new e.Point2d(100, 100));
			},
			point2dinvertedy: (t) => {
				new e.Pane({container: t})
					.addInput({value: {x: 50, y: 50}}, 'value', {
						label: 'offset',
						y: {inverted: !0},
					})
					.setValue(new e.Point2d(100, 100));
			},
			point2dinline: (t) => {
				new e.Pane({container: t}).addInput({value: {x: 50, y: 25}}, 'value', {
					expanded: !0,
					label: 'offset',
					picker: 'inline',
				});
			},
			point3d: (t) => {
				const n = {camera: {x: 0, y: 20, z: -10}, source: {x: 0, y: 0, z: 0}},
					o = new e.Pane({container: t});
				o.addInput(n, 'source').setValue(new e.Point3d(100, 100, 100)),
					o.addInput(n, 'camera', {y: {step: 10}, z: {max: 0}});
			},
			point4d: (t) => {
				const n = {min: 0, max: 1};
				new e.Pane({container: t})
					.addInput({color: {x: 0, y: 0, z: 0, w: 1}}, 'color', {
						x: n,
						y: n,
						z: n,
						w: n,
					})
					.setValue(new e.Point4d(0, 100, 100, 100));
			},
		};
		Object.keys(t).forEach((e) => {
			(0, t[e])(a(e));
		});
	}
	function xe() {
		const t = {
			active: !0,
			alert: () => {
				alert('Button pressed!');
			},
			color: '#ff0055',
			level: 0,
			name: 'Sketch',
			size: 16,
			wave: 0,
			weight: 400,
		};
		let n = 0;
		setInterval(() => {
			(t.wave = r(n)), (n += 1);
		}, 50);
		const l = {
			dat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				var a;
				e.appendChild(n.domElement),
					n.remember(t),
					(a = n.addFolder('dat.GUI')).add(t, 'size').min(10).max(100).step(1),
					a.add(t, 'weight', {Normal: 400, Bold: 700}),
					a.add(t, 'name'),
					a.add(t, 'active'),
					a.addColor(t, 'color'),
					a.add(t, 'alert'),
					a.open();
			},
			tp: (n) => {
				const o = new e.Pane({container: n, title: 'Tweakpane'});
				o.addInput(t, 'size', {min: 10, max: 100, step: 1}),
					o.addInput(t, 'weight', {options: {Normal: 400, Bold: 700}}),
					o.addSeparator(),
					o.addInput(t, 'name'),
					o.addInput(t, 'active'),
					o.addInput(t, 'color'),
					o.addButton({title: 'Alert'}).on('click', t.alert);
				const a = o.addTab({pages: [{title: 'Basic'}, {title: 'Advanced'}]});
				a.pages[0].addInput({offset: {x: 0, y: 0}}, 'offset'),
					((e) => {
						e.addInput({point3d: {x: 0, y: 0, z: 0}}, 'point3d'),
							e.addInput({point4d: {w: 0, x: 0, y: 0, z: 0}}, 'point4d');
					})(a.pages[1]);
			},
			basicsdat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				e.appendChild(n.domElement),
					n.add(t, 'level'),
					n.add(t, 'name'),
					n.add(t, 'active');
			},
			basicstp: (n) => {
				const o = new e.Pane({container: n, title: 'Parameters'});
				o.addInput(t, 'level'), o.addInput(t, 'name'), o.addInput(t, 'active');
			},
			constraintsdat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				e.appendChild(n.domElement),
					n.add(t, 'size').min(10).max(100).step(1),
					n.add(t, 'weight', {Normal: 400, Bold: 700});
			},
			constraintstp: (n) => {
				const o = new e.Pane({container: n, title: 'Parameters'});
				o.addInput(t, 'size', {min: 10, max: 100, step: 1}),
					o.addInput(t, 'weight', {options: {Normal: 400, Bold: 700}});
			},
			colordat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				e.appendChild(n.domElement), n.addColor(t, 'color');
			},
			colortp: (n) => {
				new e.Pane({container: n, title: 'Parameters'}).addInput(t, 'color');
			},
			foldersdat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				var a;
				e.appendChild(n.domElement),
					n.add(t, 'name'),
					(a = n.addFolder('Font')).add(t, 'size').min(10).max(100).step(1),
					a.add(t, 'weight', {Normal: 400, Bold: 700}),
					a.open();
			},
			folderstp: (n) => {
				const o = new e.Pane({container: n, title: 'Parameters'});
				var a;
				o.addInput(t, 'name'),
					(a = o.addFolder({title: 'Font'})).addInput(t, 'size', {
						min: 10,
						max: 100,
						step: 1,
					}),
					a.addInput(t, 'weight', {options: {Normal: 400, Bold: 700}});
			},
			buttonsdat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				e.appendChild(n.domElement), n.add(t, 'alert');
			},
			buttonstp: (n) => {
				new e.Pane({container: n, title: 'Parameters'})
					.addButton({title: 'Alert'})
					.on('click', t.alert);
			},
			eventsdat: (n) => {
				const r = a('eventsdatconsole');
				if (!r) return;
				const l = {log: ''},
					i = new e.Pane({container: r});
				i.addMonitor(l, 'log', {
					bufferSize: 10,
					interval: 0,
					label: 'console',
					lineCount: 5,
				});
				const s = new o.GUI({autoPlace: !1});
				n.appendChild(s.domElement),
					s
						.add(t, 'size')
						.min(10)
						.max(100)
						.step(1)
						.onChange((e) => {
							(l.log = `${e}`), i.refresh();
						})
						.onFinishChange((e) => {
							(l.log = `${e} (last)`), i.refresh();
						});
			},
			eventstp: (n) => {
				const o = a('eventstpconsole');
				if (!o) return;
				const r = {log: ''},
					l = new e.Pane({container: o});
				l.addMonitor(r, 'log', {
					bufferSize: 10,
					interval: 0,
					label: 'console',
					lineCount: 5,
				});
				new e.Pane({container: n, title: 'Parameters'})
					.addInput(t, 'size', {min: 10, max: 100, step: 1})
					.on('change', (e) => {
						e.last ? (r.log = `${e.value} (last)`) : (r.log = `${e.value}`),
							l.refresh();
					});
			},
			monitordat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				e.appendChild(n.domElement), n.add(t, 'wave').min(-1).max(1).listen();
			},
			monitortp: (n) => {
				new e.Pane({container: n, title: 'Parameters'}).addMonitor(t, 'wave', {
					max: 1,
					min: -1,
					view: 'graph',
				});
			},
			refreshdat: (e) => {
				const n = new o.GUI({autoPlace: !1});
				e.appendChild(n.domElement),
					n.add(t, 'wave').min(-1).max(1),
					setInterval(() => {
						n.__controllers.forEach((e) => {
							e.updateDisplay();
						});
					}, 1e3);
			},
			refreshtp: (n) => {
				const o = new e.Pane({container: n, title: 'Parameters'});
				o.addInput(t, 'wave', {max: 1, min: -1}),
					setInterval(() => {
						o.refresh();
					}, 1e3);
			},
		};
		Object.keys(l).forEach((e) => {
			(0, l[e])(a(e));
		});
	}
	function ke() {
		const t = {color: '#00ffd6', name: 'exported json', size: 10},
			n = {log: ''},
			o = {
				event: (t) => {
					const n = a('eventconsole');
					if (!n) return;
					const o = {log: '', value: 0},
						r = new e.Pane({container: n});
					r.addMonitor(o, 'log', {
						bufferSize: 10,
						interval: 0,
						label: 'console',
						lineCount: 5,
					});
					new e.Pane({container: t})
						.addInput(o, 'value', {max: 100, min: 0})
						.on('change', (e) => {
							(o.log = e.value.toFixed(2)),
								r.refresh(),
								e.last && ((o.log = '(last)'), r.refresh());
						});
				},
				globalevent: (t) => {
					const n = a('globaleventconsole');
					if (!n) return;
					const o = {
							boolean: !0,
							color: '#ff0055',
							number: 0,
							point2d: {x: 0, y: 0},
							string: 'text',
							log: '',
						},
						r = new e.Pane({container: n});
					r.addMonitor(o, 'log', {
						bufferSize: 10,
						interval: 0,
						label: 'console',
						lineCount: 5,
					});
					const l = new e.Pane({container: t});
					l.addInput(o, 'boolean'), l.addInput(o, 'color');
					const i = l.addFolder({title: 'Folder'});
					i.addInput(o, 'number', {max: 100, min: 0}),
						i.addInput(o, 'point2d'),
						i.addInput(o, 'string'),
						l.on('change', (e) => {
							const t =
								'number' == typeof e.value
									? e.value.toFixed(2)
									: JSON.stringify(e.value);
							(o.log = `changed: ${t}`), r.refresh();
						});
				},
				setValue: (t) => {
					const n = {
							boolean: !0,
							color: '#ff0055',
							number: 0,
							point2d: {x: 0, y: 0},
							string: 'text',
							log: '',
						},
						o = a('setValueConsole');
					if (!o) return;
					const r = new e.Pane({container: o});
					r.addMonitor(n, 'log', {
						label: 'preset',
						lineCount: 5,
						multiline: !0,
					});
					const l = new e.Pane({container: t}),
						i = l.addInput({hidden: !1}, 'hidden').on('change', (e) => {
							const t = JSON.stringify(e.value);
							(n.log = `hidden: ${t}`), r.refresh();
						});
					l.addButton({title: 'rigger change event'}).on('click', () => {
						i.setValue(Math.random() > 0.5);
					}),
						l.addButton({title: 'trigger change event'}).on('click', () => {
							i.setValue(Math.random() > 0.5, !1);
						});
				},
				export: (o) => {
					const r = a('exportconsole');
					if (!r) return;
					new e.Pane({container: r}).addMonitor(n, 'log', {
						label: 'preset',
						lineCount: 5,
						multiline: !0,
					});
					const l = new e.Pane({container: o});
					l.addInput(t, 'name'),
						l.addInput(t, 'size', {max: 100, min: 0}),
						l.addInput(t, 'color');
					const i = () => {
						const e = l.exportPreset();
						n.log = JSON.stringify(e, null, 2);
					};
					l.on('change', i), i();
				},
				import: (o) => {
					const r = a('importconsole');
					if (!r) return;
					new e.Pane({container: r}).addMonitor(n, 'log', {
						label: 'preset',
						lineCount: 5,
						multiline: !0,
					});
					const l = {color: '#ff0055', log: '', name: 'Pane', size: 50},
						i = new e.Pane({container: o});
					i.addButton({label: 'preset', title: 'Import'}).on('click', () => {
						i.importPreset(t);
					}),
						i.addSeparator(),
						i.addInput(l, 'name'),
						i.addInput(l, 'size'),
						i.addInput(l, 'color');
				},
				presetkey: (t) => {
					const n = a('presetkeyconsole');
					if (!n) return;
					const o = {foo: {speed: 1 / 3}, bar: {speed: 2 / 3}, preset: ''},
						r = new e.Pane({container: n});
					r.addMonitor(o, 'preset', {
						interval: 0,
						label: 'preset',
						lineCount: 4,
						multiline: !0,
					});
					const l = new e.Pane({container: t});
					l.addInput(o.foo, 'speed', {max: 1, min: 0}),
						l.addInput(o.bar, 'speed', {max: 1, min: 0, presetKey: 'speed2'});
					const i = () => {
						const e = l.exportPreset();
						(o.preset = JSON.stringify(e, null, 2)), r.refresh();
					};
					l.on('change', i), i();
				},
				label: (t) => {
					const n = {initSpd: 0, size: 30},
						o = new e.Pane({container: t});
					o.addInput(n, 'initSpd', {label: 'Initial speed'}),
						o.addInput(n, 'size', {label: 'Force field\nradius'});
				},
				insert: (t) => {
					const n = new e.Pane({container: t});
					n.addButton({title: 'Run'}),
						n.addButton({title: 'Stop'}),
						n.addButton({title: '**Reset**', index: 1});
				},
				hidden: (t) => {
					const n = new e.Pane({container: t}),
						o = n.addFolder({title: 'Advanced'});
					o.addInput({seed: 0.1}, 'seed'),
						n
							.addButton({index: 0, label: 'advanced', title: 'Toggle'})
							.on('click', () => {
								o.hidden = !o.hidden;
							});
				},
				disabled: (t) => {
					let n = 0;
					const o = {input: 1, monitor: 0};
					setInterval(() => {
						(o.monitor = r(n)), (n += 1);
					}, 200);
					const a = new e.Pane({container: t});
					a.addSeparator();
					const l = a.addInput(o, 'input', {disabled: !0}),
						i = a.addMonitor(o, 'monitor', {disabled: !0}),
						s = a.addButton({disabled: !0, title: 'Button'});
					a.addButton({index: 0, label: 'disabled', title: 'Toggle'}).on(
						'click',
						() => {
							(l.disabled = !l.disabled),
								(i.disabled = !i.disabled),
								(s.disabled = !s.disabled);
						},
					);
				},
			};
		Object.keys(o).forEach((e) => {
			(0, o[e])(a(e));
		});
	}
	function Ie() {
		const t = {positive: !1, time: '', wave: 0},
			n = () => {
				var e;
				const n = String(new Date()).match(/\d{2}:\d{2}:\d{2}/);
				t.time = null !== (e = n && n[0]) && void 0 !== e ? e : '';
			};
		setInterval(n, 1e3), n();
		let o = 0;
		setInterval(() => {
			(t.wave = r(o)), (t.positive = t.wave >= 0), (o += 1);
		}, 50);
		const l = {
			monitor: (n) => {
				const o = new e.Pane({container: n}),
					a = o.addFolder({title: 'Number'});
				a.addMonitor(t, 'wave', {label: 'text'}),
					a.addMonitor(t, 'wave', {bufferSize: 10, label: 'multiline'}),
					a.addMonitor(t, 'wave', {
						label: 'graph',
						max: 1,
						min: -1,
						view: 'graph',
					});
				o.addFolder({title: 'Boolean'}).addMonitor(t, 'positive', {
					label: 'positive',
				});
			},
			multiline: (n) => {
				const o = {params: ''};
				new e.Pane({container: n})
					.addMonitor(o, 'params', {lineCount: 5, multiline: !0})
					.on('update', () => {
						o.params = JSON.stringify(t, null, 2);
					});
			},
			buffersize: (n) => {
				new e.Pane({container: n}).addMonitor(t, 'wave', {bufferSize: 10});
			},
			interval: (n) => {
				new e.Pane({container: n}).addMonitor(t, 'time', {interval: 1e3});
			},
			graph: (n) => {
				new e.Pane({container: n}).addMonitor(t, 'wave', {
					max: 1,
					min: -1,
					view: 'graph',
				});
			},
		};
		Object.keys(l).forEach((e) => {
			(0, l[e])(a(e));
		});
	}
	function Pe() {
		const t = {
			essentials: (t) => {
				const n = {interval: {min: 16, max: 48}, radiogrid: 25},
					o = new e.Pane({container: t});
				o.registerPlugin(TweakpaneEssentialsPlugin);
				const a = o.addFolder({title: 'Input bindings'});
				a.addInput(n, 'interval', {min: 0, max: 100, step: 1});
				const r = [10, 20, 25, 50, 75, 100];
				a.addInput(n, 'radiogrid', {
					groupName: 'scale',
					label: 'radiogrid',
					size: [3, 2],
					cells: (e, t) => ({title: `${r[3 * t + e]}%`, value: r[3 * t + e]}),
					view: 'radiogrid',
				});
				const l = o.addFolder({title: 'Blades'}),
					i = l.addBlade({label: 'fpsgraph', lineCount: 2, view: 'fpsgraph'});
				!(function e() {
					i.begin(), i.end(), requestAnimationFrame(e);
				})(),
					l.addBlade({
						view: 'cubicbezier',
						value: [0.5, 0, 0.5, 1],
						expanded: !0,
						label: 'cubic\nbezier',
						picker: 'inline',
					}),
					l.addBlade({
						view: 'buttongrid',
						size: [3, 3],
						cells: (e, t) => ({
							title: [
								['NW', 'N', 'NE'],
								['W', '*', 'E'],
								['SW', 'S', 'SE'],
							][t][e],
						}),
						label: 'button\ngrid',
					});
			},
			camerakit: (t) => {
				const n = {flen: 55, fnum: 1.8, iso: 100},
					o = new e.Pane({container: t});
				o.registerPlugin(TweakpaneCamerakitPlugin),
					o.addInput(n, 'flen', {view: 'cameraring', series: 0}),
					o.addInput(n, 'fnum', {
						view: 'cameraring',
						series: 1,
						unit: {ticks: 10, pixels: 40, value: 0.2},
						wide: !0,
						min: 1.4,
						step: 0.02,
					}),
					o.addInput(n, 'flen', {view: 'cameraring', series: 2}),
					o.addInput(n, 'iso', {
						view: 'camerawheel',
						amount: 10,
						min: 100,
						step: 100,
					});
			},
		};
		Object.keys(t).forEach((e) => {
			(0, t[e])(a(e));
		});
	}
	const _e = u('ph');
	class ye {
		constructor(e, t) {
			(this.element = e.createElement('div')),
				this.element.classList.add(_e()),
				(this.element.style.height = `calc(${t.lineCount} * var(--bld-us))`),
				t.viewProps.bindClassModifiers(this.element);
			const n = e.createElement('div');
			n.classList.add(_e('t')),
				(n.textContent = t.title),
				this.element.appendChild(n);
		}
	}
	class Ce extends F {
		constructor(e, t) {
			super({
				blade: new f({positions: m([], {equals: s})}),
				view: new ye(e, t),
				viewProps: t.viewProps,
			});
		}
	}
	const Fe = {
		id: 'placeholder',
		type: 'blade',
		css: ".tp-phv {\n\talign-items: center;\n\tdisplay: flex;\n\theight: var(--bld-us);\n\tposition: relative;\n}\n.tp-phv::before {\n\tborder: var(--mo-fg) dashed 1px;\n\tborder-radius: var(--elm-br);\n\tbottom: 0;\n\tcontent: '';\n\tleft: var(--cnt-v-p);\n\topacity: 0.3;\n\tposition: absolute;\n\tright: var(--cnt-v-p);\n\ttop: 0;\n}\n.tp-phv_t {\n\tbox-sizing: border-box;\n\tcolor: var(--mo-fg);\n\tflex: 1;\n\tpadding: 4px;\n\ttext-align: center;\n}\n",
		accept(e) {
			const t = x,
				n = (function (e, t) {
					const n = x.required.object(t)(e);
					return n.succeeded ? n.value : void 0;
				})(e, {
					lineCount: t.optional.number,
					title: t.required.string,
					view: t.required.constant('placeholder'),
				});
			return n ? {params: n} : null;
		},
		controller(e) {
			var t;
			return new Ce(e.document, {
				lineCount: null !== (t = e.params.lineCount) && void 0 !== t ? t : 1,
				title: e.params.title,
				viewProps: e.viewProps,
			});
		},
		api: (e) => (e.controller instanceof Ce ? new i(e.controller) : null),
	};
	var Ee = Object.freeze({__proto__: null, plugin: Fe});
	function Me() {
		const t = {
			blades: (t) => {
				const n = new e.Pane({container: t});
				n.registerPlugin(Ee),
					n.addBlade({title: 'blade', view: 'placeholder'}),
					n.addBlade({title: 'blade', view: 'placeholder'}),
					n.addBlade({lineCount: 3, title: 'blade', view: 'placeholder'});
			},
			inputs: (t) => {
				const n = {factor: 123, title: 'hello', color: '#ff0055'},
					o = new e.Pane({container: t});
				o.addInput(n, 'factor'), o.addInput(n, 'title'), o.addInput(n, 'color');
			},
			inputparams: (t) => {
				const n = {percentage: 50, theme: 'dark'},
					o = new e.Pane({container: t});
				o.addInput(n, 'percentage', {min: 0, max: 100, step: 10}),
					o.addInput(n, 'theme', {options: {Dark: 'dark', Light: 'light'}});
			},
			folders: (t) => {
				const n = {factor: 123, text: 'hello', size: 16},
					o = new e.Pane({container: t});
				o.addInput(n, 'factor');
				const a = o.addFolder({title: 'Title', expanded: !0});
				a.addInput(n, 'text'),
					a.addInput(n, 'size', {min: 8, max: 100, step: 1});
			},
			title: (t) => {
				const n = {factor: 123, text: 'hello', size: 16},
					o = new e.Pane({container: t, title: 'Parameters'});
				o.addInput(n, 'factor');
				const a = o.addFolder({title: 'Title', expanded: !0});
				a.addInput(n, 'text'),
					a.addInput(n, 'size', {min: 8, max: 100, step: 1});
			},
			events: (t) => {
				const n = a('eventsconsole');
				if (!n) return;
				const o = {log: '', size: 16},
					r = new e.Pane({container: n});
				r.addMonitor(o, 'log', {
					bufferSize: 100,
					interval: 0,
					label: 'console',
					lineCount: 5,
				});
				new e.Pane({container: t})
					.addInput(o, 'size', {min: 8, max: 100, step: 1})
					.on('change', (e) => {
						(o.log = `change: ${e.value}`), r.refresh();
					});
			},
			preset: (t) => {
				const n = a('presetconsole');
				if (!n) return;
				const o = {factor: 50, title: 'hello', color: '#ff0055', log: ''},
					r = new e.Pane({container: n});
				r.addMonitor(o, 'log', {
					interval: 0,
					label: 'preset',
					lineCount: 5,
					multiline: !0,
				});
				const l = new e.Pane({container: t});
				l.addInput(o, 'factor', {min: 0, max: 100, step: 1}),
					l.addInput(o, 'title'),
					l.addInput(o, 'color'),
					l.addSeparator(),
					l.addButton({title: 'Export'}).on('click', () => {
						const e = l.exportPreset();
						(o.log = JSON.stringify(e, void 0, 2)), r.refresh();
					});
			},
			monitors: (t) => {
				const n = {signal: 0};
				let o = 0;
				setInterval(() => {
					(n.signal = r(o)), (o += 1);
				}, 50);
				new e.Pane({container: t}).addMonitor(n, 'signal', {
					view: 'graph',
					min: -1,
					max: 1,
				});
			},
		};
		Object.keys(t).forEach((e) => {
			(0, t[e])(a(e));
		});
	}
	function Se(e, t, n) {
		const o = document.querySelector(e);
		o &&
			((o.textContent = [
				`\x3c!-- ${n} --\x3e`,
				'<style>',
				de(':root', t),
				'</style>',
			].join('\n')),
			hljs.highlightBlock(o));
	}
	function $e({styleElem: e, theme: t}) {
		(e.textContent = de('*[data-preview-css]', t)),
			Se(
				'*[data-preview-code]',
				t,
				'Append this element into the head element to apply the theme',
			);
	}
	function Ne(t, n = !0) {
		const o = {
				checkbox: !0,
				color: 'rgba(0, 0, 0, 0)',
				list: 'item',
				point2d: {x: 0, y: 0},
				slider: 32,
				text: 'text',
				monitor: [0, 1, 2, 3].map(() => Math.random().toFixed(2)).join('\n'),
			},
			a = new e.Pane({container: t, title: 'Preview'});
		return (
			a.addInput(o, 'text'),
			a.addInput(o, 'slider', {max: 64, min: 0}),
			a.addInput(o, 'list', {options: {item: 'item'}}),
			a.addInput(o, 'checkbox'),
			a.addButton({title: 'button'}),
			a.addSeparator(),
			a.addMonitor(o, 'monitor', {interval: 0, multiline: !0}),
			a
				.addFolder({title: 'folder'})
				.addInput(o, 'color', {expanded: n, picker: 'inline'}),
			a
				.addFolder({title: 'folder'})
				.addInput(o, 'point2d', {expanded: n, picker: 'inline'}),
			a
		);
	}
	function Be() {
		const t = document.createElement('style');
		document.head.appendChild(t);
		const n = a('controller'),
			o = a('preview');
		if (!n || !o) return;
		const r = ie('translucent');
		Se('*[data-exampleCss]', r, 'Example theme: Translucent');
		const l = (function (t, n) {
			const o = new e.Pane({container: t, title: 'Panepaint'}),
				a = {preset: 'Select...'};
			return (
				o
					.addInput(a, 'preset', {
						options: {
							'Select...': '',
							Default: 'default',
							Iceberg: 'iceberg',
							Jetblack: 'jetblack',
							Light: 'light',
							Retro: 'retro',
							Translucent: 'translucent',
							Vivid: 'vivid',
						},
					})
					.on('change', (e) => {
						if ('' === e.value) return;
						const t = ie(e.value);
						Object.keys(t).forEach((e) => {
							const o = e;
							n[o] = t[o];
						}),
							(a.preset = ''),
							o.refresh();
					}),
				o.addButton({label: 'bg-image', title: 'Shuffle'}).on('click', () => {
					const e = document.querySelector('.paint_bgImage');
					if (!e) return;
					const t = new Date().getTime();
					(e.style.backgroundImage = `url(https://source.unsplash.com/collection/91620523?date=${t})`),
						Array.prototype.slice
							.call(document.querySelectorAll('.paint .photoCredit'))
							.forEach((e, t) => {
								e.style.visibility = 0 === t ? 'visible' : 'hidden';
							});
				}),
				se.forEach((e) => {
					const t = o.addFolder({expanded: !!e.expanded, title: e.name});
					e.props.forEach((a) => {
						const r = a.match(/(.+):state$/);
						if (!r)
							return void t.addInput(n, a, {
								label: e
									.label(a)
									.replace('background', 'bg')
									.replace('foreground', 'fg'),
							});
						const l = t.addFolder({title: 'State'});
						l.addButton({title: 'Autofill'}).on('click', () => {
							const e = Z(n[r[1]]).getComponents('hsl'),
								t = e[2] > 50 ? -1 : 1;
							(n[`${r[1]}-hover`] = te(
								new O([e[0], e[1], e[2] + 5 * t, e[3]], 'hsl'),
							)),
								(n[`${r[1]}-focus`] = te(
									new O([e[0], e[1], e[2] + 10 * t, e[3]], 'hsl'),
								)),
								(n[`${r[1]}-active`] = te(
									new O([e[0], e[1], e[2] + 15 * t, e[3]], 'hsl'),
								)),
								o.refresh();
						});
						const i = r[1];
						['active', 'focus', 'hover'].forEach((t) => {
							const o = [i, t].join('-');
							l.addInput(n, o, {
								label: e
									.label(o)
									.replace('background', 'bg')
									.replace('foreground', 'fg'),
							});
						});
					});
				}),
				o
			);
		})(n, r);
		$e({styleElem: t, theme: r}),
			l.on('change', () => {
				$e({styleElem: t, theme: r});
			}),
			Ne(o);
		const i = {
			header: (e) => {
				e && Ne(e, !1);
			},
		};
		Object.keys(i).forEach((e) => {
			(0, i[e])(a(e));
		});
	}
	function je() {
		const t = {
			header: (t) => {
				const n = new e.Pane({container: t, title: 'Root title'}),
					o = n.addFolder({title: 'Folder'});
				o.addInput({label: 0}, 'label'),
					o.addSeparator(),
					o.addButton({title: 'Button'});
				const a = n.addTab({pages: [{title: 'Tab'}, {title: 'Tab'}]});
				a.pages[0].addInput({label: 0}, 'label'),
					a.pages[0].addButton({label: 'label', title: 'Button'});
				a.pages[0].addFolder({title: 'Subfolder'}).addButton({title: 'Button'}),
					a.pages[1].addInput({label: 0}, 'label'),
					a.pages[1].addInput({label: 0}, 'label');
			},
			folder: (t) => {
				const n = {acceleration: 0, randomness: 0, speed: 0},
					o = new e.Pane({container: t});
				o.addFolder({title: 'Basic'}).addInput(n, 'speed');
				const a = o.addFolder({expanded: !1, title: 'Advanced'});
				a.addInput(n, 'acceleration'), a.addInput(n, 'randomness');
			},
			panetitle: (t) => {
				const n = {bounce: 0.5, gravity: 0.01, speed: 0.1},
					o = new e.Pane({container: t, title: 'Parameters'});
				o.addInput(n, 'speed', {max: 1, min: 0});
				const a = o.addFolder({title: 'Advanced'});
				a.addInput(n, 'gravity', {max: 1, min: 0}),
					a.addInput(n, 'bounce', {max: 1, min: 0});
			},
			button: (t) => {
				const n = {count: '0'},
					o = a('button', !0),
					r = new e.Pane({container: o});
				r.addMonitor(n, 'count', {interval: 0});
				new e.Pane({container: t})
					.addButton({label: 'counter', title: 'Increment'})
					.on('click', () => {
						(n.count = String(parseInt(n.count, 10) + 1)), r.refresh();
					});
			},
			tab: (t) => {
				const n = new e.Pane({container: t}).addTab({
					pages: [{title: 'Parameters'}, {title: 'Advanced'}],
				});
				n.pages[0].addInput({seed: 50}, 'seed'),
					n.pages[0].addInput({freq: 0.5}, 'freq', {min: 0, max: 1}),
					n.pages[1].addButton({label: 'danger!', title: 'Reset'});
			},
			separator: (t) => {
				const n = new e.Pane({container: t});
				n.addButton({title: 'Previous'}),
					n.addButton({title: 'Next'}),
					n.addSeparator(),
					n.addButton({title: 'Reset'});
			},
		};
		Object.keys(t).forEach((e) => {
			(0, t[e])(a(e));
		});
	}
	class Ae {
		constructor(e) {
			(this.onWindowScroll_ = this.onWindowScroll_.bind(this)),
				(this.elem_ = e),
				window.addEventListener('scroll', this.onWindowScroll_);
		}
		onWindowScroll_() {
			const e = 0.5 * window.scrollY;
			this.elem_.style.transform = `rotate(${e}deg)`;
		}
	}
	class ze {
		constructor() {
			this.routes_ = [];
		}
		add(e, t) {
			this.routes_.push({
				init: t,
				matcher: e instanceof RegExp ? (t) => e.test(t) : e,
			});
		}
		route(e) {
			this.routes_.forEach((t) => {
				t.matcher(e) && t.init();
			});
		}
	}
	class De {
		constructor(e) {
			(this.expanded_ = !1),
				(this.onDocumentClick_ = this.onDocumentClick_.bind(this)),
				(this.onButtonClick_ = this.onButtonClick_.bind(this)),
				(this.onWindowHashChange_ = this.onWindowHashChange_.bind(this)),
				(this.onWindowScroll_ = this.onWindowScroll_.bind(this)),
				(this.buttonElem_ = e.buttonElement),
				(this.menuElem_ = e.menuElement),
				this.menuElem_.classList.add('menu-loaded'),
				document.addEventListener('click', this.onDocumentClick_),
				window.addEventListener('hashchange', this.onWindowHashChange_),
				window.addEventListener('scroll', this.onWindowScroll_),
				this.buttonElem_.addEventListener('click', this.onButtonClick_),
				this.updateActiveItem_();
		}
		get expanded() {
			return this.expanded_;
		}
		set expanded(e) {
			(this.expanded_ = e),
				this.expanded_
					? this.menuElem_.classList.add('menu-expanded')
					: this.menuElem_.classList.remove('menu-expanded');
		}
		updateActiveItem_() {
			const e = ['menuItem_anchor', 'submenuItem_anchor'];
			e.forEach((e) => {
				const t = `${e}-active`;
				Array.prototype.slice
					.call(document.querySelectorAll(`.${t}`))
					.forEach((e) => {
						e.classList.remove(t);
					});
			}),
				e.forEach((e) => {
					const t = location.pathname.split('/'),
						n = t[t.length - 1] + location.hash,
						o = document.querySelector(`.${e}[href='${n}']`);
					o && o.classList.add(`${e}-active`);
				});
		}
		onDocumentClick_(e) {
			const t = e.target;
			this.menuElem_.contains(t) ||
				t === this.buttonElem_ ||
				this.buttonElem_.contains(t) ||
				(this.expanded &&
					(e.preventDefault(),
					e.stopImmediatePropagation(),
					(this.expanded = !1)));
		}
		onWindowScroll_() {
			this.expanded = !1;
		}
		onWindowHashChange_() {
			this.updateActiveItem_();
		}
		onButtonClick_() {
			this.expanded = !this.expanded;
		}
	}
	(() => {
		const e = new ze();
		e.add(/\/getting-started\/$/, he),
			e.add(/\/blades\/$/, l),
			e.add(/\/catalog\.html$/, ue),
			e.add(/\/input-bindings\/$/, we),
			e.add(/\/misc\/$/, ke),
			e.add(/\/migration\/$/, xe),
			e.add(/\/monitor-bindings\/$/, Ie),
			e.add(/\/theming\/$/, Be),
			e.add(/\/plugins\/$/, Pe),
			e.add(/\/quick-tour\/$/, Me),
			e.add(/\/ui-components\/$/, je),
			e.add(() => null !== document.querySelector(':root.index'), ve),
			e.route(location.pathname),
			document.querySelectorAll('.logo_symbol').forEach((e) => {
				new Ae(e);
			}),
			(function () {
				const e = document.getElementById('spMenuButton'),
					t = document.querySelector('.menu');
				e && t && new De({buttonElement: e, menuElement: t});
			})(),
			hljs.initHighlightingOnLoad();
	})();
});
